import { styled } from '@mui/material/styles';
import { COLOR } from '@src/styles/color';

const StyledConvertAction = styled('div')`
  padding-top: 10px;

  .note {
    display: flex;
    justify-content: space-between;
    color: ${COLOR.dark};
  }

  .action {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
  }

  .listening-button {
    text-transform: uppercase;
  }

  .character-exceed {
    font-weight: 600;
    color: ${COLOR.error};
  }

  .loading {
    margin-right: 10px;
  }

  .hide {
    opacity: 0;
  }
`;

export { StyledConvertAction };
