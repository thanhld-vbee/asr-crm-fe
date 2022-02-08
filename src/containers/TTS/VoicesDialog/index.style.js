import { styled } from '@mui/material/styles';
import { Accordion, Paper } from '@mui/material';
import { COLOR } from '@src/styles/color';

const StyledVoices = styled('div')`
  .dialog-action {
    display: grid;
    grid-template-columns: calc(100% / 4) calc(100% / 2) calc(100% / 4);
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
  }

  .action-button {
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: ${COLOR.light};
    cursor: pointer;
    &.active {
      color: ${COLOR.secondary};
    }
  }

  .action-icon {
    margin-left: 5px;
  }

  .content {
    display: flex;
  }

  .voice-search {
    width: ${(props) => props.openSearch && 'calc(100% / 3)'};
    margin-right: 15px;
    display: none;
    &.active {
      display: block;
    }
  }

  .voice-content {
    width: ${(props) => (props.openSearch ? 'calc(100% * 2 / 3)' : '100%')};
  }

  .voice-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    grid-gap: 10px;
    margin-bottom: 15px;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
  }

  .Mui-selected {
    color: ${COLOR.white} !important;
  }
`;

const StyledVoiceItem = styled(Paper)`
  padding: 10px;
  background: ${(props) => props.active && COLOR.primary};
  color: ${(props) => props.active && COLOR.white};
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  display: flex;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.active ? COLOR.primary : COLOR.white)};

  &:hover {
    border-color: ${COLOR.primary};
  }

  .voice-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
  }

  .voice-name {
    margin-left: 10px;
    font-size: 16px;
  }

  .play-icon {
    color: ${(props) => props.active && COLOR.white};
  }
`;

const StyledVoicesSearch = styled('div')`
  overflow-y: auto;
  overflow-x: hidden;
  height: 500px;
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .title {
    flex: 1;
    font-weight: bold;
  }

  .reset {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${COLOR.blue};
  }

  .reset-title {
    margin-right: 10px;
    font-weight: bold;
  }
`;

const StyledSearch = styled(Accordion)`
  box-shadow: none;

  .search-item-title {
    padding: 0;
    min-height: auto;
  }

  .search-item-content {
    padding: 0;
  }

  .form-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  .checkbox-label {
    font-size: 14px;
  }
`;

export { StyledVoices, StyledVoiceItem, StyledVoicesSearch, StyledSearch };
