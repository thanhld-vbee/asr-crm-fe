import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import giftIcon from '@src/assets/icons/gift.png';
import CommonBox from '../CommonBox';
import { StyledPromotionBox } from './index.style';
import PromotionDialog from './PromotionDialog';

const PromotionBox = () => {
  const { t } = useTranslation();
  const [openPromotionDialog, setOpenPromotionDialog] = useState(false);

  const handleOpenPromotionDialog = () => setOpenPromotionDialog(true);

  const handleClosePromotionDialog = () => setOpenPromotionDialog(false);

  return (
    <CommonBox title={t('promotion')}>
      <StyledPromotionBox>
        <Box className="choose" onClick={handleOpenPromotionDialog}>
          <img src={giftIcon} alt="icon" />
          <Typography>{t('choosePromotionTitle')}</Typography>
        </Box>
        <Typography className="note">{t('choosePromotionNote')}</Typography>
      </StyledPromotionBox>
      <PromotionDialog
        open={openPromotionDialog}
        onClose={handleClosePromotionDialog}
      />
    </CommonBox>
  );
};

export default PromotionBox;
