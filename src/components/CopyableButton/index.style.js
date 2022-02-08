import { styled } from '@mui/material/styles';
import { COLOR } from '@src/styles/color';

export const StyledCopyableButton = styled('div')`
  cursor: pointer;

  .copy {
    color: ${COLOR.primary};
  }

  .check {
    color: ${COLOR.success} !important;
  }
`;
