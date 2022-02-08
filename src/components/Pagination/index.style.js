import { styled } from '@mui/material/styles';
import { COLOR } from '@src/styles/color';

export const StyledPagination = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 15px;

  .pagination {
    button {
      &.Mui-selected {
        color: ${COLOR.white};
      }
    }
  }
`;
