import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { BREAK_TIME } from '@src/constants/voice';
import actions from '@src/redux/actions';
import { checkValidNumber } from '@src/services/checkValid';
import { StyledBreakTime, StyledMenuItem } from './index.style';

const BreakTime = ({
  currentBreakTime = 1,
  isSentence,
  disabled,
  onChange,
}) => {
  const { t } = useTranslation();
  const [isFocus, setIsFocus] = useState(false);

  const getTextValue = (value) =>
    isSentence ? `${value}s` : t('breakTimeTextValue', { value });

  const [breakTime, setBreakTime] = useState(currentBreakTime);
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState(getTextValue(currentBreakTime));

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleCloseBreakTime = (value) => {
    setBreakTime(value);
    setTextValue(getTextValue(value));
    setOpen(false);
    inputRef.current?.blur();
  };

  const handleSelectedValue = (value) => {
    if (onChange) onChange(value);
    handleCloseBreakTime(value);
  };

  const getValidBreakTime = (value) => {
    if (value < 0 || value > 60) return currentBreakTime;
    if (!Number.isInteger(Number(value)))
      return parseFloat(parseFloat(value).toFixed(1));
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
            message: 'breakTimeIsNotNumber',
          }),
        );
        handleCloseBreakTime(currentBreakTime);
        return;
      }
      if (value < 0 || value > 60) {
        dispatch(
          actions.noti.push({
            severity: 'warning',
            message: 'breakTimeInvalidRange',
          }),
        );
        handleCloseBreakTime(currentBreakTime);
        return;
      }

      const validBreakTime = getValidBreakTime(value);
      handleSelectedValue(validBreakTime);
    }
  };

  const handleFocusInput = () => {
    setTextValue(breakTime);
    setIsFocus(true);
  };

  const handleBlurInput = () => {
    setIsFocus(false);
    handleCloseBreakTime(currentBreakTime);
  };

  const handleChangeInput = (event) => setBreakTime(event.target.value);

  const handleIsOptionEqualToValue = (option, value) => {
    if (value && typeof value === 'string') {
      const lastWord = value.split(' ').pop();
      return option === getValidBreakTime(lastWord);
    }
    return option === value;
  };

  useEffect(() => {
    if (currentBreakTime) {
      setBreakTime(currentBreakTime);
      setTextValue(getTextValue(currentBreakTime));
    }
  }, [currentBreakTime]);

  return (
    <StyledBreakTime
      isSentence={isSentence}
      isFocus={isFocus}
      active={open}
      disabled={disabled}
    >
      <AccessTime fontSize="small" />
      <Autocomplete
        value={textValue}
        isOptionEqualToValue={handleIsOptionEqualToValue}
        open={open}
        disabled={disabled}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={BREAK_TIME}
        filterOptions={(option) => option}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            value={breakTime}
            inputRef={inputRef}
            className="text-field"
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
        )}
        getOptionLabel={(option) => `${option}`}
        renderOption={(props, option) => (
          <StyledMenuItem
            key={option}
            active={String(breakTime) === String(option)}
            onClick={() => handleSelectedValue(option)}
          >
            <Typography variant="body2">{option}s</Typography>
          </StyledMenuItem>
        )}
      />
    </StyledBreakTime>
  );
};
export default BreakTime;
