import { styled } from '@mui/material/styles';
import { COLOR } from '@src/styles/color';

const StyledBuyPackage = styled('div')`
  .flex-align-center {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .transition-btn {
    text-transform: unset;
    background-color: ${COLOR.dark};
    font-weight: 600;
    &:hover {
      background-color: ${COLOR.light};
    }
    img {
      margin-left: 12px;
    }
  }

  .payment-history {
    transition: opacity 1s ease-out;
    opacity: ${(props) => (props.showPaymentHistory ? '1' : '0')};
  }

  .packages {
    transition: opacity 1s ease-out;
    height: ${(props) => (props.showPaymentHistory ? '0' : 'auto')};
    opacity: ${(props) => (props.showPaymentHistory ? '0' : '1')};
  }
`;

export { StyledBuyPackage };
