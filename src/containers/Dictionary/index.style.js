import { styled } from '@mui/material/styles';

const StyleDictionary = styled('div')`
  .dialog-action {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;

    .button {
      margin-right: 10px;
      text-transform: initial;
    }
  }
`;

const StyledWordTable = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .actions {
    display: flex;
  }
`;

export { StyleDictionary, StyledWordTable };
