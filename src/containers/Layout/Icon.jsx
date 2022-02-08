import React from 'react';
import { Box, Typography } from '@mui/material';

const SidebarImgIcon = ({ src, name }) => (
  <Box sx={{ display: 'flex', gap: '16px', py: '3px' }}>
    <img src={src} alt="vbee-icon" width="30px" />
    <Typography>{name}</Typography>
  </Box>
);

export default SidebarImgIcon;
