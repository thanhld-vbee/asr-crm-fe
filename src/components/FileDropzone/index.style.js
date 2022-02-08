import styled from 'styled-components';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';

const StyledFileDropzone = styled.div`
  .dropzone {
    height: 300px;
    margin: 20px;
    border: 3px dashed ${COLOR.light};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 16px;
    cursor: pointer;
  }

  .hightlight {
    background-color: ${TRANSPARENT_COLOR.primary};
  }

  .file-input {
    display: none;
  }

  .upload-file-title {
    margin-bottom: 15px;
  }

  .upload-success {
    text-align: center;
  }

  .done-button {
    margin: 10px 0;
  }

  .other-case {
    display: flex;
    justify-content: center;
  }

  .choose-other-file {
    cursor: pointer;
    margin-left: 5px;
    color: ${COLOR.blue};
  }

  .allow-format-file {
    margin-bottom: 10px;
  }
`;
export { StyledFileDropzone };
