import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import { Cached } from '@mui/icons-material';
import CustomDatePickerRange from '@src/components/CustomDatePickerRange';
import { PACKAGE_LEVEL, PACKAGE_STATUS } from '@src/constants/package';
import { ORDER_STATUS } from '@src/constants/order';
import { PAYMENT_METHOD_TYPE } from '@src/constants/payment';
import { PAGINATION_LIMIT } from '@src/constants';
import Table from '@src/components/Table';
import apis from '@src/apis';
import i18n from '@src/languages';
import { formatCommasThousand } from '@src/utils/number';
import {
  StyledMenuItem,
  StyledChip,
  StyledPaymentHistory,
} from './index.style';

const initialFilter = {
  packageLevel: '',
  packageStatus: '',
  createdAt: [null, null],
};

const PaymentHistory = ({ open }) => {
  const [orders, setOrders] = useState([]);
  const [paging, setPaging] = useState({ page: 1, total: 0 });
  const [filter, setFilter] = useState(initialFilter);
  const [sort, setSort] = useState('createdAt_desc');

  const { t } = useTranslation();
  const { language } = i18n;

  const handleChangePage = (newPage) => {
    setPaging({ ...paging, page: newPage });
  };

  const handleSetTotal = (total) => {
    setPaging({ ...paging, total });
  };

  const handleChangeFilter = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
    handleChangePage(1);
  };

  const handleResetFilter = () => {
    setFilter(initialFilter);
    handleChangePage(1);
  };

  const handleChangeSort = (newSort) => {
    setSort(newSort);
    handleChangePage(1);
  };

  const handleChangeDatePickerRange = (value) => {
    setFilter({ ...filter, createdAt: value });
    handleChangePage(1);
  };

  const renderTypography = (content, typeText) => (
    <Typography className={`text-${typeText}-body-cell`}>{content}</Typography>
  );

  const getPackageStatusText = (status) => {
    switch (status) {
      case PACKAGE_STATUS.USING:
        return 'using';
      case PACKAGE_STATUS.PENDING:
        return 'waitingActive';
      case PACKAGE_STATUS.EXPIRED:
        return 'expired';
      case PACKAGE_STATUS.CANCEL:
        return 'notActive';
      default:
        return '';
    }
  };

  const renderPackageStatus = (status) => {
    let color;
    switch (status) {
      case PACKAGE_STATUS.USING:
        color = 'success';
        break;
      case PACKAGE_STATUS.PENDING:
        color = 'error';
        break;
      case PACKAGE_STATUS.EXPIRED:
        color = 'dark';
        break;
      case PACKAGE_STATUS.CANCEL:
        color = 'dark';
        break;
      default:
        break;
    }
    return (
      <StyledChip color={color}>{t(getPackageStatusText(status))}</StyledChip>
    );
  };

  const renderOrderStatus = (status, paymentMethodType) => {
    switch (status) {
      case ORDER_STATUS.PAID:
        return renderTypography(t('paid'), 'bold');
      case ORDER_STATUS.PENDING:
        return renderTypography(
          paymentMethodType === PAYMENT_METHOD_TYPE.BANK
            ? t('pending')
            : t('unpaid'),
          'bold',
        );
      case ORDER_STATUS.CANCEL:
        return renderTypography(t('cancel'), 'bold');
      default:
        return '';
    }
  };

  const fetchOrders = async () => {
    const { packageLevel, packageStatus, createdAt } = filter;

    const data = await apis.orders.getOrders({
      packageLevel: packageLevel || undefined,
      packageStatus: packageStatus || undefined,
      startDate: createdAt[0]
        ? moment(createdAt[0]).startOf('day').toISOString()
        : undefined,
      endDate: createdAt[1]
        ? moment(createdAt[1]).endOf('day').toISOString()
        : undefined,
      sort,
      offset: (paging.page - 1) * PAGINATION_LIMIT,
    });
    if (data && data.status) {
      setOrders(data.result.orders);
      handleSetTotal(data.result.total);
    }
  };

  useEffect(() => {
    if ((open && !orders.length) || orders.length) fetchOrders();
  }, [open, sort, paging.page, filter]);

  const columns = [
    {
      field: `package.name.${language}`,
      title: t('packageName'),
      sortable: false,
      align: 'left',
      render: (row) =>
        renderTypography(row?.package?.name?.[language], 'light'),
    },
    {
      field: 'packagePrice',
      title: t('price'),
      sortable: true,
      align: 'left',
      render: (row) =>
        renderTypography(formatCommasThousand(row.price), 'light'),
    },
    {
      field: 'createdAt',
      title: t('transactionTime'),
      sortable: true,
      align: 'left',
      render: (row) =>
        renderTypography(
          moment(row.createdAt).format('HH:mm | DD-MM-YYYY'),
          'light',
        ),
    },
    {
      field: `paymentMethod.name.${language}`,
      title: t('paymentMethod'),
      sortable: false,
      align: 'left',
      render: (row) =>
        renderTypography(row?.paymentMethod?.name?.[language], 'light'),
    },
    {
      field: 'status',
      title: t('transactionStatus'),
      sortable: false,
      align: 'left',
      render: (row) => renderOrderStatus(row.status, row.paymentMethod?.type),
    },
    {
      field: 'packageStatus',
      title: t('packageStatus'),
      sortable: false,
      align: 'left',
      render: (row) => renderPackageStatus(row.packageStatus),
    },
  ];

  const filterPackageLevels = [
    PACKAGE_LEVEL.BASIC,
    PACKAGE_LEVEL.ADVANCE,
    PACKAGE_LEVEL.PRO,
  ];

  return (
    <StyledPaymentHistory>
      <Typography className="title">{t('paymentHistory')}</Typography>
      <Grid
        container
        maxWidth
        spacing={2}
        my="16px"
        sx={{ px: { lg: '8px', md: '16px' } }}
      >
        <Grid item xs={5} md={3} xl={2.5} className="filter-item">
          <Typography className="input-label">
            {t('packageFilterTitle')}
          </Typography>
          <TextField
            size="small"
            className="text-field"
            variant="outlined"
            value={filter.packageLevel}
            name="packageLevel"
            select
            label={t('selectPackageName')}
            onChange={handleChangeFilter}
          >
            {filterPackageLevels.map((item) => (
              <StyledMenuItem key={item} value={item}>
                {t(item)}
              </StyledMenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={7} md={3} xl={2.5} className="filter-item">
          <Typography className="input-label">
            {t('statusFilterTitle')}
          </Typography>
          <TextField
            size="small"
            className="text-field"
            variant="outlined"
            value={filter.packageStatus}
            name="packageStatus"
            select
            label={t('chooseStatus')}
            onChange={handleChangeFilter}
          >
            {Object.keys(PACKAGE_STATUS).map((item) => (
              <StyledMenuItem key={item} value={PACKAGE_STATUS[item]}>
                {t(getPackageStatusText(item))}
              </StyledMenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6} xl={5} className="filter-item">
          <Typography className="input-label time-label">
            {t('timeFilterTitle')}
          </Typography>
          <CustomDatePickerRange
            value={filter.createdAt}
            onChange={handleChangeDatePickerRange}
          />
          <IconButton className="refresh-icon" onClick={handleResetFilter}>
            <Cached />
          </IconButton>
        </Grid>
      </Grid>
      <Table
        columns={columns}
        data={orders}
        total={paging.total}
        page={paging.page}
        sort={sort}
        showNumber
        onChangePage={handleChangePage}
        onChangeSort={handleChangeSort}
      />
    </StyledPaymentHistory>
  );
};

export default PaymentHistory;
