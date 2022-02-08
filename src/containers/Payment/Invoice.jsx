import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Typography } from '@mui/material';
import { StyledInvoice } from './index.style';

const Invoice = ({ invoice, error, onChange }) => {
  const { t } = useTranslation();

  const handleChangeInvoice = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  return (
    <StyledInvoice>
      <div>
        <Typography>{t('companyName')} (*)</Typography>
        <TextField
          variant="outlined"
          type="text"
          placeholder={t('companyName')}
          classes={{ root: 'invoice-input' }}
          value={invoice.companyName}
          name="companyName"
          onChange={handleChangeInvoice}
          size="small"
          inputProps={{ min: 0, max: 10 }}
          helperText={t(error.companyName)}
          error={!!error.companyName}
        />
      </div>
      <div>
        <Typography>{t('address')} (*)</Typography>
        <TextField
          variant="outlined"
          type="text"
          placeholder={t('companyAddress')}
          classes={{ root: 'invoice-input' }}
          value={invoice.companyAddress}
          name="companyAddress"
          onChange={handleChangeInvoice}
          size="small"
          inputProps={{ min: 0, max: 10 }}
          helperText={t(error.companyAddress)}
          error={!!error.companyAddress}
        />
      </div>
      <div>
        <Typography>{t('taxNumber')} (*)</Typography>
        <TextField
          variant="outlined"
          type="text"
          placeholder={t('taxNumber')}
          classes={{ root: 'invoice-input' }}
          value={invoice.companyTax}
          name="companyTax"
          onChange={handleChangeInvoice}
          size="small"
          inputProps={{ min: 0, max: 10 }}
          helperText={t(error.companyTax)}
          error={!!error.companyTax}
        />
      </div>
      <div>
        <Typography>{t('receivedInvoiceEmail')}</Typography>
        <TextField
          variant="outlined"
          type="text"
          placeholder="Email"
          classes={{ root: 'invoice-input' }}
          value={invoice.companyEmail}
          name="companyEmail"
          onChange={handleChangeInvoice}
          size="small"
          inputProps={{ min: 0, max: 10 }}
          helperText={t(error.companyEmail)}
          error={!!error.companyEmail}
        />
      </div>
    </StyledInvoice>
  );
};

export default Invoice;
