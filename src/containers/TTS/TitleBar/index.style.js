import { styled } from '@mui/material/styles';
import { COLOR } from '@src/styles/color';

const StyledTitleBar = styled('div')`
  display: flex;
  align-items: center;
  position: relative;
  padding-bottom: 10px;

  .base-input {
    flex: 1;
    margin-left: 5px;
    margin-right: 20px;
    font-size: 19px;
    font-weight: 600;
  }

  .voice {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .choose-voice {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .voice-name {
    margin: 0 10px;
  }

  .icon {
    cursor: pointer;
    color: ${COLOR.dark};
  }
`;

export { StyledTitleBar };
