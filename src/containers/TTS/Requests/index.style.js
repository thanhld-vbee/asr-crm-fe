import { styled } from '@mui/material/styles';
import { DialogContent, MenuItem, Typography } from '@mui/material';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { BORDER_RADIUS } from '@src/styles/config';

export const StyledRequests = styled('div')`
  padding: 10px 0;

  .request-wrapper {
    margin-bottom: 15px;
  }

  .request-filter {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
  }

  .text-field-request {
    margin-right: 10px;
    background-color: ${COLOR.white};
    width: 100%;
    height: fit-content;
    border-radius: ${BORDER_RADIUS};
    max-width: 150px;

    .MuiInputLabel-root {
      font-size: 14px;
    }
  }

  .date-field {
    margin-right: 10px;
    min-width: 180px;
  }

  .refresh-icon {
    svg {
      font-size: 32px;
    }
  }

  .transition-btn {
    text-transform: unset;
    background-color: ${COLOR.dark};
    font-weight: 600;
    &:hover {
      background-color: ${COLOR.light};
    }
    img {
      margin-left: 12px;
    }
  }
`;

export const StyledRequestTable = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .action-cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .in-progress-status {
    min-width: 100px;
    max-width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .linear-progress-wrapper {
    width: 100%;
    margin-right: 10px;
  }
`;

export const StyledViewRequest = styled(DialogContent)`
  margin-bottom: 15px;

  .header {
    margin-top: 25px;
    background-color: ${COLOR.primary};
    color: ${COLOR.white};
    padding: 10px;
    .header-title {
      font-weight: 600;
      text-transform: uppercase;
      text-align: center;
    }
  }
  .information-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 24px 0px 24px 40px;
    border: 1px solid ${COLOR.light};
    gap: 20px;
  }

  .information-column {
    display: grid;
    width: 50%;
    grid-template-columns: 120px auto;
    grid-column-gap: 15px;
    grid-auto-rows: min-content;
    grid-row-gap: 15px;
    .title {
      font-weight: 500;
    }
  }

  .request-content {
    border: 1px solid ${COLOR.light};
  }

  .view-paragraph-content {
    padding: 24px 40px;
    .content {
      color: ${COLOR.dark};
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
  }

  .view-sentence-content {
    padding: 16px 32px;
    .header-cell {
      text-transform: uppercase;
      color: ${COLOR.dark};
    }

    th,
    td {
      border-bottom: 1px solid ${COLOR.light};
    }

    td {
      padding: 24px 16px;
    }
  }

  .request-id {
    display: flex;
    align-items: center;
    gap: 8px;
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
