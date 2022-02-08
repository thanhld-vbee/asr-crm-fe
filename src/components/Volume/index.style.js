import { styled } from '@mui/material/styles';
import { Popover, Slider } from '@mui/material';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { BORDER_RADIUS } from '@src/styles/config';

const StyledVolume = styled('div')`
  .custom-button {
    width: ${(props) => props.width || '140px'};
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 5px;
    margin: 0 8px;
    border-radius: ${BORDER_RADIUS};

    &:hover {
      background: ${TRANSPARENT_COLOR.dark};
    }

    ${(props) =>
      props.isEdit && {
        background: TRANSPARENT_COLOR.primary,
        '&:hover': {
          background: TRANSPARENT_COLOR.primary,
        },
      }}

    ${(props) =>
      props.active && {
        background: TRANSPARENT_COLOR.primary,
        '&:hover': {
          background: TRANSPARENT_COLOR.dark,
        },
      }}

    ${(props) =>
      props.disabled && {
        cursor: 'default',
        color: COLOR.light,
        '&:hover': {
          background: 'inherit',
        },
      }}
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

const StyledPopover = styled(Popover)`
  .volume-wrapper {
    width: 210px;
    margin: 30px 20px 10px 20px;
  }
`;

const StyledSlider = styled(Slider)`
  color: ${COLOR.primary};
  height: 6px;

  & .MuiSlider-valueLabel {
    font-weight: bold;
    font-size: 14px;
    top: -8px;
    background-color: unset;
    color: ${COLOR.text};

    &:before {
      display: none;
    }
  }

  & .MuiSlider-thumb {
    height: 14px;
    width: 14px;
    background-color: ${COLOR.white};
    border: 1px solid currentColor;
  }
`;

export { StyledVolume, StyledPopover, StyledSlider };
