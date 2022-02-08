import { styled } from '@mui/material/styles';
import { COLOR } from '@src/styles/color';

export const StyledTTS = styled('div')`
  .action-header {
    margin: 10px 0;
    display: flex;
    align-items: center;
  }

  .scroll-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: ${({ openRequest }) => !openRequest && '20px'};
    margin-bottom: 10px;
  }

  .download-audio-note {
    color: ${COLOR.error};
  }

  .opacity-none {
    opacity: 0;
  }

  .display-none {
    display: none;
  }

  .tts {
    transition: opacity 1s ease-out;
    visibility: ${(props) => (props.openRequest ? 'hidden' : 'visible')};
    height: ${(props) => (props.openRequest ? '0' : 'auto')};
    opacity: ${(props) => (props.openRequest ? '0' : '1')};
  }

  .align-center {
    display: flex;
    justify-content: center;
  }

  .align-right {
    display: flex;
    justify-content: flex-end;
  }

  .transition-btn {
    text-transform: unset;
    background-color: ${COLOR.dark};
    font-weight: 600;
    &:hover {
      background-color: ${COLOR.light};
    }
    img {
      margin-left: 12px;
    }
  }
`;

export const StyledImportToolbar = styled('div')`
  display: flex;
  align-items: center;
  flex: 1;

  .upload-button {
    min-width: 180px;
    text-transform: initial;
  }

  .paste {
    margin-left: 10px;
  }
`;

export const StyledProcessingMethods = styled('div')`
  display: flex;

  .switch-wrapper {
    margin: 0 15px;
  }

  .icon {
    cursor: pointer;
  }
`;

export const StyledHandleByUrl = styled('div')`
  .actions {
    padding: 20px 24px;
  }
`;
