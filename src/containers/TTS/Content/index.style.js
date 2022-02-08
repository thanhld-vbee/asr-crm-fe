import { styled } from '@mui/material/styles';
import { COLOR } from '@src/styles/color';

const StyledContent = styled('div')`
  .editor-wrapper {
    height: 250px;
    overflow: auto;
  }
  .character-exceed {
    color: ${COLOR.danger};
  }
  .DraftEditor-root {
    height: 90%;
    padding: 10px 0;
    font-family: 'SF Pro Display', sans-serif;
    font-size: 16px;
    line-height: 1.5;
  }

  .search-highlight {
    color: ${COLOR.white};
    background-color: ${COLOR.primary};
  }
`;

const StyledSentenceItem = styled('div')`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${COLOR.divider};
  padding: 3px 0;

  .check-box {
    padding: 0;
  }

  .voice-info {
    margin-left: 15px;
    cursor: pointer;
  }

  .editor-container {
    flex: 1;
    font-size: 14px;
  }
  .character-exceed {
    color: ${COLOR.danger};
  }

  .play-audio {
    margin: 0 10px;
  }
`;

const StyledSentences = styled('div')`
  height: 250px;
  overflow-y: auto;
  margin: 10px;

  .check-box-all {
    padding: 10px;
  }
`;

export { StyledContent, StyledSentenceItem, StyledSentences };
