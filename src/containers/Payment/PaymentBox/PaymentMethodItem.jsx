import React from 'react';
import classNames from 'classnames';
import { Box, Radio, Typography } from '@mui/material';
import i18n from '@src/languages';
import { StyledPaymentMethodItem } from './index.style';

const PaymentMethodItem = ({
  paymentMethod,
  selected = false,
  children,
  onCheck,
  darkRadio,
}) => {
  const { language } = i18n;
  const { id, name, type, icon, description } = paymentMethod;

  const handleChangeRadio = () => onCheck(id, type);

  return (
    <StyledPaymentMethodItem key={id} darkRadio={darkRadio}>
      <Box className="header">
        <Radio
          color="primary"
          checked={selected}
          onChange={handleChangeRadio}
        />
        <div className="icon">
          <img src={icon} alt="icon" />
        </div>
        <Typography className={classNames({ unselected: !selected })}>
          {name[language]}
        </Typography>
      </Box>
      {selected && (
        <Box className="content-payment-method">
          <Typography className="description">
            {description[language]}
          </Typography>
          <Box className="body">{children}</Box>
        </Box>
      )}
    </StyledPaymentMethodItem>
  );
};

export default PaymentMethodItem;
