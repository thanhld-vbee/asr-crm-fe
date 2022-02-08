import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { FastForward } from '@mui/icons-material';
import { SPEED } from '@src/constants/voice';
import actions from '@src/redux/actions';
import { checkValidNumber } from '@src/services/checkValid';
import { StyledSpeed, StyledMenuItem } from './index.style';

const Speed = ({ currentSpeed = 1, isSentence, disabled, onChange }) => {
  const { t } = useTranslation();

  const getTextValue = (value) =>
    isSentence ? `${value}x` : t('speedTextValue', { value });

  const [speed, setSpeed] = useState(currentSpeed);
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState(getTextValue(currentSpeed));
  const [isFocus, setIsFocus] = useState(false);

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleCloseSpeed = (value) => {
    setSpeed(value);
    setTextValue(getTextValue(value));
    setOpen(false);
    inputRef.current?.blur();
  };

  const handleSelectedValue = (value) => {
    if (onChange) onChange('speed', value);
    handleCloseSpeed(value);
  };

  const checkMoreThanTwoDecimalDigits = (number) =>
    Number.isInteger(number * 100);

  const getValidSpeed = (value) => {
    const speedNumber = Number(value);
    if (value < 0.1 || value > 1.9) return currentSpeed;
    if (!checkMoreThanTwoDecimalDigits(speedNumber))
      return parseFloat(parseFloat(value).toFixed(2));
    return value;
  };

  const handleKeyDown = (e) => {
    const { value } = e.target;
    if (e.key === 'Enter') {
      const isNumber = checkValidNumber(value);
      if (!isNumber) {
        dispatch(
          actions.noti.push({
            severity: 'warning',
            message: 'speedIsNotNumber',
          }),
        );
        handleCloseSpeed(currentSpeed);
        return;
      }
      if (value < 0.1 || value > 1.9) {
        dispatch(
          actions.noti.push({
            severity: 'warning',
            message: 'speedInvalidRange',
          }),
        );
        handleCloseSpeed(currentSpeed);
        return;
      }

      const validSpeed = getValidSpeed(value);
      handleSelectedValue(validSpeed);
    }
  };

  const handleFocusInput = () => {
    setIsFocus(true);
    setTextValue(speed);
  };

  const handleBlurInput = () => {
    setIsFocus(false);
    handleCloseSpeed(currentSpeed);
  };

  const handleChangeInput = (event) => setSpeed(event.target.value);

  const handleIsOptionEqualToValue = (option, value) => {
    if (value && typeof value === 'string') {
      const lastWord = value.split(' ').pop();
      return option?.value === getValidSpeed(lastWord);
    }
    return option?.value === value;
  };

  useEffect(() => {
    if (currentSpeed) {
      setSpeed(currentSpeed);
      setTextValue(getTextValue(currentSpeed));
    }
  }, [currentSpeed]);

  return (
    <StyledSpeed
      isSentence={isSentence}
      isFocus={isFocus}
      active={open}
      disabled={disabled}
    >
      <FastForward fontSize="small" />
      <Autocomplete
        value={textValue}
        isOptionEqualToValue={handleIsOptionEqualToValue}
        open={open}
        disabled={disabled}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={SPEED}
        filterOptions={(option) => option}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            value={speed}
            inputRef={inputRef}
            className="text-field"
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
        )}
        getOptionLabel={(option) => `${option?.value || option}`}
        renderOption={(props, option) => (
          <StyledMenuItem
            key={option.title}
            active={String(speed) === String(option.value)}
            onClick={() => handleSelectedValue(option.value)}
            isSentence={isSentence}
          >
            <Typography variant="body2"> {option.value}x</Typography>
            <Typography variant="body2">{t(option.title)}</Typography>
          </StyledMenuItem>
        )}
      />
    </StyledSpeed>
  );
};
export default Speed;
