import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { COLOR } from '@src/styles/color';

export const StyledComeBack = styled(Box)`
  display: flex;
  align-items: center;
  opacity: 0.8;
  cursor: pointer;
  svg {
    color: ${COLOR.dark};
    font-size: 20px;
  }

  .title {
    font-weight: 600;
    color: ${COLOR.dark};
  }

  &:hover {
    opacity: 1;
  }
`;
