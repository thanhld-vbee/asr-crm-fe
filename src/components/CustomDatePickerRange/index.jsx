import React from 'react';
import moment from 'moment';
import { Box, TextField } from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useTranslation } from 'react-i18next';
import {
  CustomDateRangePickerDay,
  StyledCustomDatePickerRange,
} from './index.style';

const CustomDatePickerRange = ({ value = [null, null], onChange }) => {
  const { t } = useTranslation();

  const renderWeekPickerDay = (date, dateRangePickerDayProps) => (
    <CustomDateRangePickerDay {...dateRangePickerDayProps} />
  );

  const handleChange = (newValue) => onChange && onChange(newValue);

  const renderDate = (date) => {
    if (date) return moment(date).format('DD-MM-YYYY');
    return '';
  };

  return (
    <StyledCustomDatePickerRange>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          calendars={1}
          value={value}
          onChange={handleChange}
          renderDay={renderWeekPickerDay}
          renderInput={(startProps) => (
            <>
              <TextField
                ref={startProps.inputRef}
                {...startProps.inputProps}
                size="small"
                value={renderDate(value[0])}
                className="text-field"
                variant="outlined"
                placeholder={t('start')}
              />
              <Box mx={1}>{t('to')}</Box>
              <TextField
                ref={startProps.inputRef}
                {...startProps.inputProps}
                size="small"
                className="text-field"
                value={renderDate(value[1])}
                variant="outlined"
                placeholder={t('end')}
              />
            </>
          )}
        />
      </LocalizationProvider>
    </StyledCustomDatePickerRange>
  );
};
export default CustomDatePickerRange;
