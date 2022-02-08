import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

import arrowIconDown from '@src/assets/icons/arrow-icon-down.png';
import arrowIconUp from '@src/assets/icons/arrow-icon-up.png';
import Card from '@src/components/Card';

import PaymentHistory from '../PaymentHistory';
import Packages from '../Packages';

import { StyledBuyPackage } from './index.style';

const BuyPackage = () => {
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  const { t } = useTranslation();

  const handleClickTransitionButton = () =>
    setShowPaymentHistory(!showPaymentHistory);

  return (
    <StyledBuyPackage showPaymentHistory={showPaymentHistory}>
      {showPaymentHistory ? (
        <Card
          padding="6px 0px"
          height="calc(79vh - 72px);"
          className="payment-history flex-align-center"
        >
          <Button
            variant="contained"
            className="transition-btn"
            onClick={handleClickTransitionButton}
          >
            {t('backToPackage')} <img src={arrowIconUp} alt="icon" />
          </Button>
          <PaymentHistory open={showPaymentHistory} />
        </Card>
      ) : (
        <Card padding="6px 0px" className="packages flex-align-center">
          <Packages />
          <Button
            variant="contained"
            className="transition-btn"
            onClick={handleClickTransitionButton}
          >
            {t('paymentHistory')} <img src={arrowIconDown} alt="icon" />
          </Button>
        </Card>
      )}
    </StyledBuyPackage>
  );
};

export default BuyPackage;
