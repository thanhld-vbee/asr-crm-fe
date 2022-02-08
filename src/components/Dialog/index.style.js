import { styled } from '@mui/material/styles';
import { Dialog } from '@mui/material';
import { COLOR } from '@src/styles/color';

const StyledDialog = styled(Dialog)`
  min-width: ${(props) => props.width || '550px'};

  .dialog-title {
    text-align: center;
  }

  .close-button {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .sub-title {
    color: ${COLOR.dark};
    margin: 5px 0;
  }
`;
export { StyledDialog };
