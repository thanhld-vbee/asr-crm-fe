import {
  Box,
  StepConnector,
  stepConnectorClasses,
  Stepper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { BORDER_RADIUS } from '@src/styles/config';

export const StyledPaymentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 20px 0;
  position: relative;

  .content-wrapper {
    width: 100%;
    margin: unset;
  }

  .column {
    padding: 10px;
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export const StyledStepper = styled(Stepper)`
  .label-above {
    display: flex;
    flex-direction: column-reverse !important;
    margin-top: -46px;
    gap: 8px;
    .MuiStepLabel-label {
      font-weight: 600;
      color: ${COLOR.light};
    }
    &.active {
      .MuiStepLabel-label {
        color: ${COLOR.primary} !important;
      }
    }
    &.completed {
      .MuiStepLabel-label {
        color: ${COLOR.dark} !important;
      }
    }
  }
`;

export const StyledStepConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: COLOR.primary,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: COLOR.primary,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: COLOR.light,
    borderTopWidth: 1,
    borderRadius: 1,
  },
}));

export const StyledStepIcon = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-weight: 600;
  color: ${COLOR.white};
  background-color: ${({ active, completed }) =>
    active || completed ? COLOR.primary : COLOR.light};
`;

export const StyledBox = styled(Box)`
  position: relative;
  border-radius: ${BORDER_RADIUS};
  padding: 20px;
  min-height: 400px;
  ${({ bordered }) =>
    bordered
      ? `border: 2px solid ${COLOR.divider};`
      : `background: ${TRANSPARENT_COLOR.light};`}

  .title {
    font-weight: ${({ bold }) => (bold ? 'bold' : 600)};
    color: ${COLOR.dark};
    width: fit-content;
    position: absolute;
    font-size: 18px;
    ${({ bordered }) =>
      bordered
        ? ` top: -14px;
        background: ${COLOR.white};
        padding-right: 30px;
        padding-left: 12px;
        position: absolute;`
        : `top: 0;`}
  }

  .box-content {
    ${({ bordered }) => !bordered && `margin-top: 30px;`}
  }
`;

export const StyledInvoice = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 7px;

  .invoice-input {
    width: 100%;
    input {
      font-size: 15px;
    }
  }
  p {
    font-weight: 500;
  }
`;

export const StyledCompletedAction = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
