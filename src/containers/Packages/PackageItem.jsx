import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ROUTES from '@src/constants/route';
import {
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Chip,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { COLOR } from '@src/styles/color';
import SchoolIcon from '@mui/icons-material/School';
import { DURATION, PACKAGE_LEVEL, PACKAGE_TYPE } from '@src/constants/package';
import actions from '@src/redux/actions';
import i18n from '@src/languages';
import apis from '@src/apis';
import ProcessHandler from '@src/components/ProcessHandler';
import { ORDER_STATUS } from '@src/constants/order';
import NotificationDialog from '@src/components/NotificationDialog';

import { StyledPackageItem } from './index.style';

const PackageItem = ({ data, duration }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { usingPackage, latestOrder } = useSelector((state) => state.user);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState({
    createFreeOrder: false,
    cancelOrder: false,
  });

  const { language } = i18n;

  const handleCreateFreeOrder = async (packageId) => {
    if (usingPackage.level === PACKAGE_LEVEL.BASIC) return;

    if (latestOrder.status === ORDER_STATUS.PENDING) {
      setOpenDialog(true);
      return;
    }

    setLoading({ ...loading, createFreeOrder: true });
    const orderData = await apis.orders.createOrder({ packageId });
    if (orderData.status) {
      setLoading({ ...loading, createFreeOrder: false });
      dispatch(actions.user.getLatestOrderSuccess(orderData.result));
      dispatch(
        actions.noti.push({
          severity: 'success',
          message: 'buyPackageSuccessfully',
        }),
      );
      history.push(ROUTES.TTS);
      return;
    }

    actions.noti.push({ severity: 'error', message: 'buyPackageFailure' });
  };

  const handleStartNow = () => {
    if (data.type !== PACKAGE_TYPE.STUDIO) return;
    if (data.price === 0) {
      if (usingPackage.code?.includes(DURATION.BASIC)) return;
      handleCreateFreeOrder(data.id);
      return;
    }
    history.replace({ search: `?package=${data.code}` });
  };

  const handleCancelPendingOrder = async () => {
    if (latestOrder.status !== ORDER_STATUS.PENDING) return;

    setLoading({ ...loading, cancelOrder: true });
    const orderData = await apis.orders.cancelOrder(latestOrder.id);
    setLoading({ ...loading, cancelOrder: false });
    if (!orderData.status)
      dispatch(actions.noti.push({ severity: 'error', code: orderData.code }));
    else {
      dispatch(actions.user.getLatestOrderSuccess(orderData.result));
      dispatch(
        actions.noti.push({
          severity: 'success',
          message: 'cancelOrderSuccessfully',
        }),
      );
    }

    setOpenDialog(false);
    setLoading({ ...loading, createFreeOrder: false });
  };

  const handleContinuePayingDialog = () => {
    if (latestOrder.status !== ORDER_STATUS.PENDING) return;
    if (latestOrder.paymentLink)
      window.location.assign(latestOrder.paymentLink);
    else history.replace({ search: `?package=${data.code}` });
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const renderButtonText = () => {
    if (data.type !== PACKAGE_TYPE.STUDIO) return t('comingSoon');
    if (data.price > 0) return t('buyNow');
    if (usingPackage.level === PACKAGE_LEVEL.BASIC) return t('using');

    return (
      <ProcessHandler loading={loading.createFreeOrder} size={25}>
        {t('startNow')}
      </ProcessHandler>
    );
  };

  const renderPackagePriceUnit = () => {
    const { price } = data;
    if (price <= 0) return '';
    if (price < 1) return `${t('vnd')}/${t('character')}`;
    return `${t('VND')}/${
      duration === DURATION.MONTHLY ? t('month') : t('year')
    }`;
  };

  return (
    <StyledPackageItem mostPopular={data.mostPopular}>
      <CardContent className={classnames({ 'most-popular': data.mostPopular })}>
        <Box className="chip-wrapper">
          {data.mostPopular && (
            <Chip
              size="small"
              className="chip chip-popular"
              label={t('popular')}
            />
          )}
          {data.recommended && (
            <Chip
              size="small"
              label={t('recommended')}
              className="chip"
              color="secondary"
            />
          )}
        </Box>
        {data.icon ? (
          <img src={data.icon} alt="icon-type" />
        ) : (
          <SchoolIcon
            color="primary"
            fontSize="large"
            className={classnames({ 'most-popular': data.mostPopular })}
          />
        )}
        <Typography
          className={classnames('package-name', {
            'most-popular': data.mostPopular,
          })}
        >
          {data.name && data.name[language]}
        </Typography>
        <Box className="price-wrapper">
          <Typography
            color={COLOR.primary}
            className={classnames('price', {
              'most-popular': data.mostPopular,
            })}
          >
            {data.price === 0 ? `${t('free')}` : data.price.toLocaleString()}
          </Typography>
          <Typography>{renderPackagePriceUnit()}</Typography>
        </Box>
        <Button
          fullWidth
          className={classnames('button-start', {
            'button-most-popular': data.mostPopular,
          })}
          variant="outlined"
          onClick={handleStartNow}
        >
          {renderButtonText()}
        </Button>
        <Divider />
        <List>
          {data?.contents?.length &&
            data.contents.map((item) => (
              <ListItem disabled className="clarify" button key={item}>
                <ListItemIcon className="icon-contents">
                  <CheckCircle
                    color="primary"
                    className={classnames({
                      'most-popular': data.mostPopular,
                    })}
                  />
                </ListItemIcon>
                <Typography
                  variant="subtitle2"
                  color={data.mostPopular ? COLOR.white : COLOR.dark}
                >
                  {item[language]}
                </Typography>
              </ListItem>
            ))}
        </List>
      </CardContent>
      {data.price === 0 && (
        <NotificationDialog
          name="pendingOrder"
          title={t('havePendingOrderTitle')}
          description={t('havePendingOrderDescription')}
          variant="warning"
          open={openDialog}
          onClose={handleCloseDialog}
          actionComponent={
            <>
              <Button variant="outlined" onClick={handleCancelPendingOrder}>
                <ProcessHandler loading={loading.cancelOrder} size={25}>
                  {t('cancelOrder')}
                </ProcessHandler>
              </Button>
              <Button variant="contained" onClick={handleContinuePayingDialog}>
                {t('continue')}
              </Button>
            </>
          }
        />
      )}
    </StyledPackageItem>
  );
};

export default PackageItem;
