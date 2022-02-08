import { styled } from '@mui/material/styles';
import { MenuItem } from '@mui/material';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { BORDER_RADIUS } from '@src/styles/config';

const StyledBreakTime = styled('div')`
  display: flex;
  align-items: center;
  padding: 0 5px;
  margin: 0 8px;
  border-radius: ${BORDER_RADIUS};

  &:hover {
    background: ${TRANSPARENT_COLOR.dark};
  }

  ${(props) =>
    props.disabled && {
      cursor: 'none',
      color: COLOR.light,
      '&:hover': {
        background: 'inherit',
      },
    }}

  ${(props) =>
    props.active && {
      background: TRANSPARENT_COLOR.primary,
      '&:hover': {
        background: TRANSPARENT_COLOR.primary,
      },
    }}

  .text-field {
    width: ${(props) => (props.isSentence ? '64px' : '150px')};
  }

  .MuiOutlinedInput-notchedOutline {
    border: ${(props) =>
      props.isFocus ? `1px solid ${COLOR.primary}` : 'none'};
  }

  .MuiOutlinedInput-root {
    padding: 5px 8px !important;
  }

  .MuiTextField-root {
    &:hover fieldset {
      border: none;
    }
  }

  input {
    padding: 0 !important;
    font-weight: bold;
    font-size: 14px;
    color: ${COLOR.text};
  }
`;

const StyledMenuItem = styled(MenuItem)`
  padding: 10px 20px;
  cursor: pointer;
  color: ${(props) => props.active && COLOR.white};
  background-color: ${(props) => props.active && COLOR.primary};

  &:hover {
    color: ${(props) => (props.active ? COLOR.white : COLOR.text)};
    background-color: ${(props) =>
      props.active ? COLOR.primary : TRANSPARENT_COLOR.primary};
  }
`;

export { StyledBreakTime, StyledMenuItem };
