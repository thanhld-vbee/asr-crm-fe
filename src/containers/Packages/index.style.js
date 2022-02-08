import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import { GRADIENT_COLOR, COLOR } from '@src/styles/color';
import { BOX_SHADOW } from '@src/styles/config';

const StyledPackages = styled('div')`
  width: 100%;

  .tabs-header {
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid ${COLOR.primary};
  }
  .tabs-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .tab {
    min-width: 300px;
    background-color: ${COLOR.white};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .tab-active {
    border: 1px solid ${COLOR.primary};
    margin-bottom: -1px;
    border-bottom: none;
  }
  .tab-inactive {
    background-color: ${COLOR.divider};
    color: ${COLOR.dark};
  }

  .duration-header {
    display: flex;
    justify-content: center;
    margin: 24px 0;
  }
  .duration-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .duration {
    min-width: 200px;
    background-color: ${COLOR.primary};
    color: ${COLOR.white};
    text-transform: none;
  }
  .duration-inactive {
    background-color: ${COLOR.divider};
    color: ${COLOR.dark};
  }

  .packages-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .packages {
    width: 100%;
    max-width: ${(props) => (props.num < 3 ? '800px' : '1200px')};
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 16px;
    margin-bottom: 24px;
  }
`;

const StyledPackageItem = styled(Card)`
  box-shadow: ${BOX_SHADOW};
  background: ${(props) => props.mostPopular && GRADIENT_COLOR.primary};

  .most-popular {
    color: ${COLOR.white} !important;
  }

  .package-name {
    font-size: 22px;
    font-weight: bold;
    color: ${COLOR.dark};
  }
  .chip-wrapper {
    display: flex;
    justify-content: flex-end;
    height: 24px;
    gap: 8px;
  }
  .price-wrapper {
    display: flex;
    align-items: flex-end;
  }

  .price {
    font-size: 49px;
    font-weight: bold;
    line-height: 44px;
    margin-right: 8px;
    white-space: nowrap;
  }
  .chip {
    font-weight: bold;
  }
  .chip-popular {
    color: ${COLOR.primary};
    background: ${COLOR.white};
  }
  .button-start {
    font-weight: bold;
    margin: 16px 0px;
  }
  .button-most-popular {
    background-color: ${COLOR.white};
  }
  .button-most-popular:hover {
    color: ${COLOR.primary};
    background-color: ${COLOR.white};
  }
  .icon-contents {
    margin-left: -16px;
    margin-right: -16px;
  }
  .clarify {
    opacity: 1 !important;
  }
`;

export { StyledPackages, StyledPackageItem };
