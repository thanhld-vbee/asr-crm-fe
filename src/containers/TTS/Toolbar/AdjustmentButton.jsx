import React from 'react';
import { Typography } from '@mui/material';
import { StyledAdjustmentButton } from './index.style';

const AdjustmentButton = ({
  value,
  name,
  text,
  icon,
  width,
  options = [],
  onChange,
}) => {
  const handleChange = () => {
    const currentIndex = options.indexOf(value);

    let nextPosition = currentIndex;
    if (currentIndex >= 0 && currentIndex < options.length - 1)
      nextPosition = currentIndex + 1;
    if (currentIndex === options.length - 1) nextPosition = 0;

    const newValue = options[nextPosition];
    if (onChange) onChange(name, newValue);
  };

  return (
    <StyledAdjustmentButton
      role="presentation"
      className="button-wrapper"
      onClick={handleChange}
      width={width}
    >
      {typeof icon === 'string' ? (
        <img src={icon} alt="audio-format" className="button-img" />
      ) : (
        icon
      )}
      <Typography variant="body2" className="button-text">
        {value} {text && ` ${text}`}
      </Typography>
    </StyledAdjustmentButton>
  );
};

export default AdjustmentButton;
