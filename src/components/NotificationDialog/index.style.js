import { styled } from '@mui/material/styles';
import { Dialog } from '@mui/material';
import { COLOR } from '@src/styles/color';

const StyledDialog = styled(Dialog)`
  min-width: ${(props) => props.width || '512px'};

  .dialog-wrapper {
    display: flex;
    gap: 22px;
    padding: 23px 30px;
  }

  .content-wrapper {
    flex: 1;
  }

  .dialog-title {
    max-width: 390px;
    font-weight: 500;
    padding: 0;
    color: ${COLOR.dark};
  }

  .title {
    font-size: 21px;
    margin-bottom: 6px;
    font-weight: 500;
  }

  .description {
    font-size: 14px;
  }

  .dialog-content {
    padding: 20px 4px;
  }

  button {
    text-transform: unset;
  }
`;
export { StyledDialog };
