import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { BORDER_RADIUS } from '@src/styles/config';

export const StyledOrderBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 30px;

  .information {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .value {
      text-align: right;
    }

    .value .reduction {
      color: ${COLOR.success};
    }
  }

  .label {
    width: fit-content;
    font-weight: 500;
  }

  .payment-sum {
    width: 97%;
    display: flex;
    justify-content: space-between;
    border-radius: ${BORDER_RADIUS};
    padding: 14px 6px;
    font-weight: 500;
    background: ${TRANSPARENT_COLOR.success};

    .sum {
      text-align: right;
      .price {
        color: ${COLOR.danger};
        b {
          font-weight: bold;
          font-size: 20px;
        }
      }
      .vat {
        font-size: 10px;
      }
    }
  }

  button {
    text-transform: unset;
    font-weight: bold;
    font-size: 16px;
    padding-top: 6px;
    padding-bottom: 6px;
  }

  .text-link {
    text-decoration: none;
    color: inherit;
  }
`;
