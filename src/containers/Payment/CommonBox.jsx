import React from 'react';
import { Typography } from '@mui/material';
import { StyledBox } from './index.style';

const CommonBox = ({ title, bordered = true, boldTitle = false, children }) => (
  <StyledBox bordered={bordered} bold={boldTitle}>
    <Typography className="title">{title}</Typography>
    <div className="box-content">{children}</div>
  </StyledBox>
);

export default CommonBox;
