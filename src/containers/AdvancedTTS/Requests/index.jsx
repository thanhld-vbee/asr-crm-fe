import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Typography, IconButton, TextField, Grid, Button } from '@mui/material';
import { Cached } from '@mui/icons-material';
import CustomDatePickerRange from '@src/components/CustomDatePickerRange';
import { REQUEST_STATUS } from '@src/constants/voice';
import { PAGINATION_LIMIT } from '@src/constants';
import { FETCH_REQUESTS_INTERVAL } from '@src/constants/websocket';
import apis from '@src/apis';
import arrowIconUp from '@src/assets/icons/arrow-icon-up.png';

import { useSelector } from 'react-redux';
import RequestTable from './RequestTable';

import { StyledRequests, StyledMenuItem } from './index.style';

const initialFilter = {
  title: '',
  status: '',
  createdAt: [null, null],
};

const Requests = ({
  requestLoading,
  openRequest,
  handleOpenRequest,
  onChangeRequestLoading,
}) => {
  const [requests, setRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(initialFilter);
  const [sort, setSort] = useState('createdAt_desc');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const requestsRef = useRef(requests);
  const pageRef = useRef(page);
  const filterRef = useRef(filter);
  const sortRef = useRef(sort);

  const responseRequest = useSelector((state) => state.request);

  const handleChangePage = (newPage) => setPage(newPage);

  const handleChangeFilter = (name, value) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleChangeSort = (newSort) => {
    setSort(newSort);
    setPage(1);
  };

  const handleResetFilter = () => {
    setFilter(initialFilter);
    setPage(1);
  };

  const handleChangeDatePickerRange = (value) =>
    handleChangeFilter('createdAt', value);

  const fetchRequests = async (hasLoading) => {
    if (hasLoading) setLoading(true);
    const { title, status, createdAt } = filterRef.current;

    const data = await apis.requests.getRequests({
      search: title,
      sort: sortRef.current,
      offset: (pageRef.current - 1) * PAGINATION_LIMIT,
      startDate: createdAt[0]
        ? moment(createdAt[0]).startOf('day').toISOString()
        : undefined,
      endDate: createdAt[1]
        ? moment(createdAt[1]).endOf('day').toISOString()
        : undefined,
      status,
    });
    setLoading(false);
    onChangeRequestLoading(false);
    if (data && data.status) {
      setRequests(data.result.requests);
      setTotalRequests(data.result.metadata.total);
    }
  };

  const handleBackToTTS = () => {
    handleOpenRequest(false);
    setPage(1);
    handleResetFilter();
  };

  useEffect(() => {
    requestsRef.current = requests;
  }, [requests]);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

  useEffect(() => {
    sortRef.current = sort;
  }, [sort]);

  useEffect(() => {
    fetchRequests(true);
  }, [page, filter, sort]);

  useEffect(() => {
    if (requestLoading) fetchRequests(false);
  }, [requestLoading]);

  useEffect(() => {
    const newRequests = requests.map((request) => {
      const isInProgressRequest =
        request.status === REQUEST_STATUS.IN_PROGRESS &&
        responseRequest[request.id];
      if (isInProgressRequest) {
        request.status = responseRequest[request.id].status;
        request.audioLink = responseRequest[request.id].audioLink;
        request.progress = responseRequest[request.id].progress;
      }
      return request;
    });
    setRequests(newRequests);
  }, [responseRequest]);

  useEffect(() => {
    const fetchRequestsInterval = setInterval(async () => {
      const inProgressRequest = requestsRef.current.find(
        (request) => request.status === REQUEST_STATUS.IN_PROGRESS,
      );
      if (inProgressRequest) fetchRequests(false);
    }, FETCH_REQUESTS_INTERVAL);

    return () => clearInterval(fetchRequestsInterval);
  }, []);

  return (
    <StyledRequests>
      {openRequest && (
        <>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="baseline"
          >
            <Button
              variant="contained"
              className="transition-btn"
              onClick={handleBackToTTS}
            >
              {t('backToTTS')} <img src={arrowIconUp} alt="icon" />
            </Button>
          </Grid>
          <Grid container className="request-wrapper">
            <Grid item sm={3}>
              <Typography
                variant="subtitle2"
                color="error"
                className="opacity-none"
              >
                *{t('note')}: {t('audioStorageNote')}
              </Typography>
            </Grid>
            <Grid item sm={9} className="request-filter">
              <TextField
                size="small"
                className="text-field-request"
                variant="outlined"
                value={filter.title}
                label={t('title')}
                onChange={(e) => handleChangeFilter('title', e.target.value)}
              />
              <div className="date-field">
                <CustomDatePickerRange
                  value={filter.createdAt}
                  onChange={handleChangeDatePickerRange}
                />
              </div>
              <TextField
                size="small"
                className="text-field-request"
                variant="outlined"
                value={filter.status}
                select
                label={t('status')}
                onChange={(e) => handleChangeFilter('status', e.target.value)}
              >
                {Object.keys(REQUEST_STATUS).map((item) => (
                  <StyledMenuItem key={item} value={item}>
                    {t(item)}
                  </StyledMenuItem>
                ))}
              </TextField>
              <IconButton className="refresh-icon" onClick={handleResetFilter}>
                <Cached />
              </IconButton>
            </Grid>
          </Grid>
        </>
      )}
      <RequestTable
        requests={requests}
        page={page}
        total={totalRequests}
        sort={sort}
        loading={loading}
        onChangeSort={handleChangeSort}
        onChangePage={handleChangePage}
      />
    </StyledRequests>
  );
};

export default Requests;
