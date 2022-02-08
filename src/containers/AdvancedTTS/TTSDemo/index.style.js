import { styled } from '@mui/material/styles';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';

const StyledTTSDemo = styled('div')`
  margin: 15px 0;

  .action-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .time-line {
    display: flex;
    align-items: center;
  }

  .download-audio {
    display: ${(props) => (props.isPreview ? 'none' : 'block')};
  }
`;

const StyledAudioPlayer = styled('div')`
  margin: 15px 0;
  cursor: pointer;

  .input-range__track--active,
  .input-range__slider {
    background: ${COLOR.primary} !important;
    border-radius: 3px;
    height: 6px;
  }

  .input-range__label {
    display: none;
  }

  .input-range__track--background {
    background: ${TRANSPARENT_COLOR.secondary};
  }
`;

export { StyledTTSDemo, StyledAudioPlayer };
