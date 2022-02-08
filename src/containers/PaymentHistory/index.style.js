import { MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { BORDER_RADIUS } from '@src/styles/config';

export const StyledPaymentHistory = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 36px;
  gap: 0 16px;

  .title {
    text-transform: uppercase;
    font-weight: 600;
  }

  .filter-item {
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 500px;

    .input-label {
      font-weight: 500;
      width: fit-content;
      font-size: 14px;
      white-space: nowrap;
    }

    .time-label {
      width: fit-content;
      flex-shrink: 0;
      font-size: 14px;
    }
  }

  .text-field {
    background-color: ${COLOR.white};
    height: fit-content;
    border-radius: ${BORDER_RADIUS};
    width: 180px;

    .MuiInputLabel-root {
      font-size: 14px;
    }
  }

  .refresh-icon {
    svg {
      font-size: 32px;
    }
  }

  .text-light-body-cell {
    color: ${COLOR.dark};
    font-size: 14px;
  }

  .text-bold-body-cell {
    font-weight: 600;
    font-size: 14px;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    font-weight: 500;
    &:focus {
      color: ${COLOR.white};
      background-color: ${COLOR.primary};
      &:hover {
        background-color: ${COLOR.primary};
        color: ${COLOR.white};
      }
    }
    &:hover {
      background-color: ${TRANSPARENT_COLOR.primary};
      &.MuiListItemIcon-root,
      &.MuiListItemText-primary {
        color: ${COLOR.white};
      }
    }
  }
`;

export const StyledChip = styled(Typography)`
  background-color: ${({ color }) => TRANSPARENT_COLOR[color]};
  color: ${({ color }) => COLOR[color]};
  padding: 1px 10px;
  border-radius: 17px;
  font-size: 13px;
  font-weight: 500;
  width: fit-content;
  white-space: nowrap;
`;
