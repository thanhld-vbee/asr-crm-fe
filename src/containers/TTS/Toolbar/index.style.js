import { styled } from '@mui/material/styles';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { BORDER_RADIUS } from '@src/styles/config';

const StyledAdjustmentButton = styled('div')`
  width: ${(props) => props.width || '65px'};
  border-radius: ${BORDER_RADIUS};
  margin: 0 8px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background: ${TRANSPARENT_COLOR.dark};
  }

  .button-img {
    width: 20px;
    height: 20px;
  }

  .button-text {
    margin-left: 10px;
    font-weight: bold;
  }
`;

const StyledToolbar = styled('div')`
  display: flex;
  flex-wrap: wrap !important;
  align-items: flex-start !important;
  margin-top: 10px;

  .icon {
    cursor: pointer;
  }

  .search-input {
    width: 220px;
    margin: 0 8px;
  }

  input {
    padding-left: 10px;
  }

  .replace-input {
    margin: 0 8px 0 0;
  }

  .MuiTextField-root {
    &:hover fieldset {
      border: none;
    }
  }

  .action {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .border-right {
    border-right: 1px solid ${COLOR.light};
  }

  .custom-button {
    cursor: pointer;
    padding: 5px;
    margin: 0 8px;
    display: flex;
    align-items: center;
    border-radius: ${BORDER_RADIUS};

    &:hover {
      background: ${TRANSPARENT_COLOR.dark};
    }
  }

  .active {
    background: ${TRANSPARENT_COLOR.primary};
  }

  .button-img {
    width: 20px;
    height: 20px;
  }

  .button-text {
    margin-left: 10px;
    font-weight: bold;
  }

  .action-icon-button {
    padding: 3px 8px;
  }

  .button-wrapper {
    margin: 0 8px;
    border-radius: ${BORDER_RADIUS};
    &:hover {
      background: ${TRANSPARENT_COLOR.dark};
    }
  }

  .redo-button {
    margin: 0 8px 0 0;
  }

  .disabled {
    &:hover {
      background: inherit;
    }
  }
`;

export { StyledAdjustmentButton, StyledToolbar };
