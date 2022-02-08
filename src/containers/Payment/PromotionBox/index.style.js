import { DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';

import { COLOR } from '@src/styles/color';
import { BORDER_RADIUS } from '@src/styles/config';

export const StyledPromotionBox = styled('div')`
  .choose {
    display: flex;
    gap: 6px;
    align-items: center;
    cursor: pointer;
    p {
      color: ${COLOR.primary};
      font-weight: 500;
    }
  }
  .note {
    font-size: 12px;
    font-weight: 500;
  }
`;

export const StyledPromotionDialog = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  padding-left: 46px;
  padding-right: 46px;

  .promotion-title {
    font-weight: 500;
    font-size: 21px;
    margin-bottom: 15px;
  }

  hr {
    border-width: 2;
    margin-top: 20px;
    margin-bottom: 15px;
  }
`;

export const StyledInputWrapper = styled('div')`
  display: flex;
  border: 1px solid ${COLOR.light};
  border-radius: ${BORDER_RADIUS};
  padding: 2px 2px 2px 12px;

  .input-promotion {
    flex: 1;
    width: 100%;
    font-size: 14px;
  }

  button {
    border-radius: 0px ${BORDER_RADIUS} ${BORDER_RADIUS} 0px;
    text-transform: unset;
    padding: 6px 12px;
  }
`;
