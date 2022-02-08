import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PAYMENT_STEP } from '@src/constants/payment';
import { formatCommasThousand } from '@src/utils/number';
import i18n from '@src/languages';
import { ORDER_STATUS } from '@src/constants/order';
import { VBEE_TERMS } from '@src/configs';

import CommonBox from '../CommonBox';
import { StyledOrderBox } from './index.style';

const OrderBox = ({
  currPackage,
  isBankTransfer,
  activeStep,
  hasPaid,
  onAgreeToPay,
  onConfirmTransferOrder,
}) => {
  const { t } = useTranslation();
  const { language } = i18n;
  const { latestOrder } = useSelector((state) => state.user);

  const handleAgreeToPay = () => onAgreeToPay();

  const handleContinueToPay = () => {
    if (latestOrder.status === ORDER_STATUS.PENDING)
      window.location.assign(latestOrder.paymentLink);
  };
  const showContinueToPay =
    activeStep === PAYMENT_STEP.COMPLETED &&
    latestOrder.paymentLink &&
    latestOrder.status === ORDER_STATUS.PENDING;

  const showConfirmButton =
    activeStep === PAYMENT_STEP.COMPLETED &&
    isBankTransfer &&
    !latestOrder.isConfirmedByCustomer;

  const renderPaymentButton = () => {
    if (hasPaid) return '';
    if (showContinueToPay)
      return (
        <Button fullWidth variant="contained" onClick={handleContinueToPay}>
          {t('continueToPay')}
        </Button>
      );
    if (showConfirmButton)
      return (
        <Button fullWidth variant="contained" onClick={onConfirmTransferOrder}>
          {t('transferredConfirmation')}
        </Button>
      );
    if (activeStep === PAYMENT_STEP.PAYMENT)
      return (
        <Button fullWidth variant="contained" onClick={handleAgreeToPay}>
          {t('agreeToPay')}
        </Button>
      );
    return '';
  };

  return (
    <CommonBox boldTitle title={t('yourOrder')}>
      <StyledOrderBox>
        <Box className="information">
          <div className="row">
            <Typography className="label">{t('package')}</Typography>
            <Typography className="value" variant="">
              <b>{currPackage.name && currPackage.name[language]}</b> -{' '}
              {formatCommasThousand(currPackage.maxCharacters)} {t('words')}
            </Typography>
          </div>
          <div className="row">
            <Typography className="label">{t('expiry')}</Typography>
            <Typography className="value">
              <b>{currPackage.expiresIn}</b> {t('day')}
            </Typography>
          </div>
          <div className="row">
            <Typography className="label">{t('price')}</Typography>
            <Typography className="label value">
              <b>{formatCommasThousand(currPackage.price)}</b> VNĐ
            </Typography>
          </div>
          {/* <div className="row">
            <Typography className="label">{t('promotionReduction')}</Typography>
            <Typography className="label value">
              <b className="reduction">-1000</b> VNĐ
            </Typography>
          </div> */}
        </Box>
        <Box className="payment-sum">
          <Typography className="label">{t('paymentSum')}</Typography>
          <div className="sum">
            <Typography className="price">
              <b>{formatCommasThousand(currPackage.price)}</b> VNĐ
            </Typography>
            <Typography className="vat">{t('includeVAT')}</Typography>
          </div>
        </Box>
        {renderPaymentButton()}
        <Typography color="primary">
          <a
            className="text-link"
            href={VBEE_TERMS}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('policyAndTerms')}
          </a>
        </Typography>
      </StyledOrderBox>
    </CommonBox>
  );
};
export default OrderBox;
