import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import comingSoonImg from '@src/assets/images/coming-soon.png';
import { StyledComingSoon } from './index.style';

const ComingSoon = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleBackToPreviousPage = () => history.goBack();
  return (
    <StyledComingSoon>
      <Typography className="coming-soon-title">
        {t('comingSoonTitle')}
      </Typography>
      <Button onClick={handleBackToPreviousPage} variant="contained">
        {t('back')}
      </Button>
      <Box sx={{ width: { sm: '100%', md: '80%', xl: '50%' } }}>
        <img src={comingSoonImg} alt="coming soon" />
      </Box>
    </StyledComingSoon>
  );
};

export default ComingSoon;
