import { styled } from '@mui/material/styles';
import { Rating } from '@mui/material';
import { COLOR } from '@src/styles/color';

const StyledRating = styled(Rating)`
  margin: 10px;

  & .MuiRating-iconHover {
    color: ${COLOR.primary};
  }

  & .MuiRating-iconFilled {
    color: ${COLOR.primary};
  }
`;

export { StyledRating };
