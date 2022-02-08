import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import noDataImage from '@src/assets/images/no-data.png';
import { StyledNoData } from './index.style';

const NoData = () => {
  const { t } = useTranslation();

  return (
    <Box width="100%" margin="auto">
      <StyledNoData>
        <img src={noDataImage} alt="no data" />
        <Typography>{t('noDataTitle')}</Typography>
      </StyledNoData>
    </Box>
  );
};

export default NoData;
