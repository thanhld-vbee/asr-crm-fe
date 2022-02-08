import MuiDateRangePickerDay from '@mui/lab/DateRangePickerDay';
import { styled } from '@mui/material/styles';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { BORDER_RADIUS } from '@src/styles/config';

export const StyledCustomDatePickerRange = styled('div')`
  width: 100%;
  .text-field {
    background-color: ${COLOR.white};
    width: 100%;
    height: fit-content;
    border-radius: ${BORDER_RADIUS};
    max-width: 200px;
    font-size: 14px;
  }
`;

export const CustomDateRangePickerDay = styled(MuiDateRangePickerDay)(
  ({ isHighlighting, isStartOfHighlighting, isEndOfHighlighting }) => ({
    ...(isHighlighting && {
      borderRadius: 0,
      backgroundColor: TRANSPARENT_COLOR.primary,
      color: COLOR.primary,
      '&:hover, &:focus': {
        backgroundColor: COLOR.primary,
        color: COLOR.white,
      },
    }),
    ...(isStartOfHighlighting && {
      backgroundColor: COLOR.primary,
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
      '.Mui-selected': {
        color: `${COLOR.white} !important`,
      },
    }),
    ...(isEndOfHighlighting && {
      backgroundColor: COLOR.primary,
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
      '.Mui-selected': {
        color: `${COLOR.white} !important`,
      },
    }),
  }),
);
