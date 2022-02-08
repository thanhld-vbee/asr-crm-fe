import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { StyledVolume, StyledPopover, StyledSlider } from './index.style';

const Volume = ({
  volume = 100,
  icon,
  text,
  max,
  width,
  active,
  disabled,
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleChangeVolume = (e, newValue) => {
    if (onChange) onChange(newValue);
  };

  const valueText = (value) => `${value}%`;

  return (
    <StyledVolume
      isEdit={Boolean(anchorEl)}
      active={active}
      disabled={disabled}
      width={width}
    >
      <div
        className="custom-button"
        role="presentation"
        onClick={!disabled && handleClick}
      >
        {typeof icon === 'string' ? (
          <img src={icon} alt="audio-format" className="button-img" />
        ) : (
          icon
        )}
        <Typography variant="body2" className="button-text">
          {`${text} ${volume}%`}
        </Typography>
      </div>
      <StyledPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box className="volume-wrapper">
          <StyledSlider
            size="small"
            aria-label="Volume"
            color="primary"
            valueLabelDisplay="on"
            value={volume}
            min={0}
            max={max}
            valueLabelFormat={valueText}
            onChange={handleChangeVolume}
          />
        </Box>
      </StyledPopover>
    </StyledVolume>
  );
};

export default Volume;
