import { styled } from '@mui/material/styles';

export const StyledComingSoon = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 80%;
  margin: auto;
  padding: 50px 0;

  .coming-soon-title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }

  img {
    width: 100%;
  }
`;
