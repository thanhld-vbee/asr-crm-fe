import React from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowBackIos } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { StyledComeBack } from './index.style';

const ComeBack = ({ title, to, onClick, ...rest }) => {
  const history = useHistory();

  const handleComeBack = () => {
    if (!to) history.goBack();
    else history.push(to);
  };

  const handleClick = (event) => {
    if (onClick) onClick(event);
    else handleComeBack();
  };

  return (
    <StyledComeBack onClick={handleClick} {...rest}>
      <ArrowBackIos />
      <Typography className="title">{title}</Typography>
    </StyledComeBack>
  );
};

export default ComeBack;
