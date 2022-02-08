import React from 'react';
import { Button, Divider, InputBase, Typography } from '@mui/material';
import Dialog from '@src/components/Dialog';
import { useTranslation } from 'react-i18next';
import { StyledInputWrapper, StyledPromotionDialog } from './index.style';

const PromotionDialog = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledPromotionDialog>
        <Typography className="promotion-title">
          {t('promotionTitle')}
        </Typography>
        <StyledInputWrapper>
          <InputBase
            autoFocus
            className="input-promotion"
            value=""
            placeholder={t('enterPromotionCode')}
          />
          <Button variant="contained">{t('apply')}</Button>
        </StyledInputWrapper>
        <Divider />
      </StyledPromotionDialog>
    </Dialog>
  );
};

export default PromotionDialog;
