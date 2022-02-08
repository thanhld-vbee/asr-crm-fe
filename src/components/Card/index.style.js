import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { BORDER_RADIUS, BOX_SHADOW } from '@src/styles/config';
import { COLOR } from '@src/styles/color';

export default styled(Box)`
  border-radius: ${BORDER_RADIUS};
  box-shadow: ${BOX_SHADOW};
  background-color: ${COLOR.white};
  padding: ${(props) => props.padding || 0};
  margin: ${(props) => props.margin || 0};
`;
