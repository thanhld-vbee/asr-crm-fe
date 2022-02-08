import { styled } from '@mui/material/styles';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';

const StyledMusic = styled('div')`
  .file-input {
    display: none;
  }

  .upload-music-button {
    text-transform: initial;
    margin-left: 50px;
    cursor: pointer;
  }

  .upload-wrapper {
    margin: 10px 0 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .upload-filename {
    flex: 1;
  }

  .upload-button,
  .reject-button {
    margin-right: 10px;
    padding: 5px;
  }

  .music-list {
    height: 240px;
  }

  .list-item {
    cursor: pointer;
    border-radius: 10px;
  }

  .list-item-hover {
    &:hover {
      background-color: ${TRANSPARENT_COLOR.primary};
    }
  }

  .icon {
    cursor: pointer;
  }

  .list-item-icon {
    padding: 10px;
    color: ${COLOR.primary};
  }

  .selected {
    background-color: ${COLOR.primary};
    color: ${COLOR.white};
  }

  .loading {
    color: ${COLOR.white};
  }

  .dialog-action {
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
  }

  .apply-button {
    width: 150px;
    padding: 5px;
    text-transform: initial;
  }

  .play-audio-button {
    cursor: pointer;
  }
`;

export { StyledMusic };
