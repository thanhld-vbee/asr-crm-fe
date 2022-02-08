import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { REQUEST_STATUS } from '@src/constants/voice';
import Table from '@src/components/Table';
import { Typography, Box, LinearProgress } from '@mui/material';
import { formatCommasThousand } from '@src/utils/number';
import apis from '@src/apis';
import actions from '@src/redux/actions';
import ViewRequest from './ViewRequest';
import RequestAction from './RequestAction';

import { StyledRequestTable, StyledChip } from './index.style';

const RequestTable = ({
  requests = [],
  page,
  total,
  sort,
  loading,
  onChangePage,
  onChangeSort,
}) => {
  const [openView, setOpenView] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleOpenView = (requestId) => {
    setOpenView(true);
    setSelectedRequestId(requestId);
  };

  const handleCloseView = () => {
    setOpenView(false);
    setSelectedRequestId(null);
  };

  const renderStatus = (status, progress) => {
    switch (status) {
      case REQUEST_STATUS.IN_PROGRESS: {
        return (
          <Box className="in-progress-status">
            <Box className="linear-progress-wrapper">
              <LinearProgress
                variant="determinate"
                value={progress}
                color="primary"
              />
            </Box>
            <Box>
              <Typography variant="body2">
                {`${Math.round(progress)}%`}
              </Typography>
            </Box>
          </Box>
        );
      }
      case REQUEST_STATUS.SUCCESS:
        return <StyledChip color="success">{t(status)}</StyledChip>;
      case REQUEST_STATUS.FAILURE:
        return <StyledChip color="error">{t(status)}</StyledChip>;
      default:
        return <div />;
    }
  };

  const columns = [
    {
      field: 'title',
      title: t('title'),
      sortable: false,
      align: 'left',
    },
    {
      field: 'characters',
      title: t('characters'),
      sortable: true,
      align: 'center',
      render: (row) => formatCommasThousand(row.characters) || 0,
    },
    {
      field: 'createdAt',
      title: t('time'),
      sortable: true,
      align: 'center',
      render: (row) => moment(row.createdAt).format('HH:mm | DD-MM-YYYY'),
    },
    {
      field: 'status',
      title: t('status'),
      sortable: false,
      align: 'left',
      render: (row) => renderStatus(row.status, row.progress),
    },
    {
      field: 'voice.code',
      title: t('voice'),
      sortable: true,
      align: 'left',
      render: (row) => row.voice && row.voice.name,
    },
    {
      field: 'action',
      title: t('action'),
      sortable: false,
      align: 'center',
      render: (row) => (
        <RequestAction request={row} onOpenView={handleOpenView} />
      ),
    },
  ];

  const handleRowClick = async (requestId) => {
    const data = await apis.requests.getRequest(requestId);
    if (data?.status) {
      const synthesisConfig = data.result;

      const bitrateOfBps = synthesisConfig.bitrate || 0;
      const newSynthesisConfig = {
        ...synthesisConfig,
        bitrate: bitrateOfBps / 1000,
      };

      dispatch(
        actions.synthesisRequest.updateSynthesisConfig(newSynthesisConfig),
      );
      dispatch(actions.synthesisRequest.updateLoadingSynthesisConfig(true));
    }
  };

  return (
    <StyledRequestTable>
      <Table
        columns={columns}
        data={requests}
        page={page}
        total={total}
        sort={sort}
        loading={loading}
        // selection
        onChangeSort={onChangeSort}
        onChangePage={onChangePage}
        onRowClick={handleRowClick}
      />
      <ViewRequest
        open={openView}
        requestId={selectedRequestId}
        onClose={handleCloseView}
      />
    </StyledRequestTable>
  );
};

export default RequestTable;
