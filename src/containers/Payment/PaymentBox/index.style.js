import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { BORDER_RADIUS } from '@src/styles/config';

export const StyledPaymentMethodItem = styled(Box)`
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    align-items: center;
  }

  .content-payment-method {
    display: flex;
    flex-direction: column;

    .description {
      color: ${COLOR.dark};
      opacity: 0.8;
      font-weight: 600;
      margin-left: 54px;
    }

    .body {
      padding: 16px 0px 16px 32px;
    }
  }

  .icon {
    padding-left: 10px;
    padding-right: 24px;
  }

  .MuiButtonBase-root {
    padding: 8px;
    ${({ darkRadio }) => darkRadio && `opacity: 0.6; color: ${COLOR.dark};`}

    span svg:first-child {
      display: none;
    }

    span svg:last-child {
      top: -6px;
      left: -6px;
    }
  }

  .MuiButtonBase-root span:nth-of-type(1) {
    border-radius: 50%;
    border: 1px solid;
    width: 24px;
    height: 24px;
  }

  .MuiSvgIcon-root {
    font-size: 36px;
  }

  .unselected {
    font-weight: 600;
  }
`;

export const StyledBankItem = styled(Box)`
  position: relative;
  width: 107px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${COLOR.light};
  border-radius: ${BORDER_RADIUS};
  padding: 15px 3px;
  &:hover {
    cursor: pointer;
    background: ${TRANSPARENT_COLOR.light};
  }

  ${({ selected }) => selected && `border: 1px solid ${COLOR.primary};`}

  .done-box {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: -8px;
    right: -11px;

    background: ${COLOR.white};
    padding: 3px;
    border-radius: 30%;

    .done-circle {
      position: relative;
      border: 2px solid ${COLOR.primary};
      border-radius: 50%;
      width: 24px;
      height: 24px;

      svg {
        position: absolute;
        bottom: 1px;
        right: -8px;
        font-size: 30px;
        color: ${COLOR.primary};
        z-index: 1;
        transform: rotate(-1deg);
      }
    }

    .done-trick {
      position: absolute;
      width: 10px;
      height: 23px;
      transform: rotate(45deg);
      right: 2px;
      top: 1px;
      background: ${COLOR.white};
      z-index: 0;
    }
  }
`;

export const StyledBankList = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 12px;
  align-items: center;
`;

export const StyledTransferInformation = styled(Box)`
  padding: 6px 0;
  display: flex;
  flex-direction: column;
  .content-wrapper {
    display: flex;
    gap: 35px;
    align-items: start;
  }

  .content-information {
    display: grid;
    grid-template-columns: 30% 70%;
    align-items: baseline;
    gap: 5px 25px;
    flex: 1;

    .label {
      font-weight: 500;
      color: ${COLOR.dark};
      opacity: 0.8;
    }

    .value {
      font-weight: 500;
    }

    .card-number {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .value svg {
      color: ${COLOR.primary};
      font-size: 20px;
      cursor: pointer;
    }
  }

  .note {
    font-weight: 500;
    line-height: 25px;
  }
`;
