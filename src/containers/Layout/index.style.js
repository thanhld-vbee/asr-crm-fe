import * as React from 'react';
import { AppBar, Drawer, Menu, Dialog } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { BOX_SHADOW, BORDER_RADIUS, SIDEBAR_WIDTH } from '@src/styles/config';

const StyledWrapper = styled('div')`
  position: relative;
  top: 0;
  height: 100vh;

  &:after {
    display: table;
    clear: both;
    content: '';
  }
`;

const StyledMainPanel = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    '&.open-sidebar': { width: `calc(100% - ${SIDEBAR_WIDTH}px)` },
  },
  overflow: 'auto',
  position: 'relative',
  float: 'right',
  height: '100%',
  width: '100%',
}));

const StyledAppBar = styled(AppBar)`
  background: transparent;
  box-shadow: none;
  position: absolute;
  width: 100%;
  z-index: 1029;
  min-height: 64px;
  display: block;
  position: sticky;
  top: 16px;

  .container {
    min-height: 64px;
    padding-left: 16px;
    padding-right: 16px;
    margin: 0 16px;
    border-radius: ${BORDER_RADIUS};
    color: ${COLOR.text};
    box-shadow: ${BOX_SHADOW};
    background-color: ${COLOR.white};

    &:before,
    &:after {
      display: table;
      content: '';
    }

    &:after {
      clear: both;
    }
  }
`;

const StyledContent = styled('div')`
  min-width: 600px;
  flex-grow: 1;
  margin: 32px 16px 16px 16px;
  min-height: calc(100% - 170px);
  display: flex;
  flex-direction: column;

  .banner {
    width: 100%;
  }

  .content-layout {
    flex-grow: 1;
  }
`;

const StyledSidebar = styled('div')`
  .brand {
    padding: 16px 0;
    margin: 0;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 4;
    .logo {
      flex-grow: 1;
      display: flex;
      justify-content: center;
    }
    .logo-img {
      cursor: pointer;
      width: 144px;
    }
  }

  .sidebar-wrapper {
    position: relative;
    /* height: calc(100vh - 75px); */
    overflow: auto;
    width: 260px;
    z-index: 4;
    color: inherit;
    padding-bottom: 30px;
  }

  .list {
    margin-top: 16px;
    padding-left: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 0;
    list-style: none;
    color: inherit;

    &:before,
    &:after {
      display: table;
      content: '';
    }

    &:after {
      clear: both;
    }
  }

  .collapse-list {
    margin-top: 0;

    &.caret {
      margin-top: 8px;
    }
  }

  .collapse-active {
    outline: none;
    background-color: ${COLOR.primary};
    box-shadow: none;
  }

  .item {
    color: inherit;
    position: relative;
    display: block;
    margin: 0;
    padding: 0;
  }

  .item-link {
    margin: 10px 15px 0;
    border-radius: ${BORDER_RADIUS};
    position: relative;
    display: block;
    padding: 10px 15px;
    width: auto;
    text-decoration: none;
    line-height: 30px;

    &:hover {
      outline: none;
      background-color: ${TRANSPARENT_COLOR.primary};
      box-shadow: none;
    }

    &,
    &:hover,
    &:focus {
      color: inherit;
    }
  }

  .item-icon {
    color: inherit;
    width: 30px;
    height: 24px;
    float: left;
    position: inherit;
    top: 3px;
    margin-right: 15px;
    text-align: center;
    vertical-align: middle;
    opacity: 0.8;
  }

  .item-text {
    color: inherit;
    margin: 0;
    line-height: 30px;
    position: relative;
    display: block;
    height: auto;
    white-space: nowrap;
    padding: 0 16px !important;
  }

  .caret {
    margin-top: 4px;
    position: absolute;
    right: 18px;
  }

  .active-link {
    &,
    &:hover,
    &:focus {
      color: ${COLOR.white};
      background-color: ${COLOR.primary};
      box-shadow: ${BOX_SHADOW};
    }
  }

  .convert-ole-version-button {
    margin: 10px 15px 0;
    border-radius: 5px;
    padding: 10px 15px;
    min-width: 225px;
  }

  .vbee-v3-img {
    margin-right: 10px;
  }
`;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    border: 'none',
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    zIndex: '1032',
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    boxShadow: BOX_SHADOW,
    width: SIDEBAR_WIDTH,

    [theme.breakpoints.up('md')]: {
      width: SIDEBAR_WIDTH,
      position: 'fixed',
      height: '100%',
    },

    [theme.breakpoints.down('sm')]: {
      width: SIDEBAR_WIDTH,
      boxShadow: BOX_SHADOW,
      position: 'fixed',
      display: 'block',
      top: '0',
      height: '100vh',
      right: '0',
      left: 'auto',
      zIndex: '1032',
      visibility: 'visible',
      overflowY: 'visible',
      borderTop: 'none',
      textAlign: 'left',
      paddingRight: '0px',
      paddingLeft: '0',
    },

    '&:before,&:after': {
      position: 'absolute',
      zIndex: '3',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      top: '0',
    },
  },
}));

const StyledNavBar = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .navbar-item {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .btn-order {
    display: flex;
  }
  .pending-button {
    color: ${COLOR.dark};
  }
  .error-button {
    color: ${COLOR.danger};
  }

  .language-icon {
    width: 16px;
  }
  .language-text {
    font-weight: normal;
    text-transform: none;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 8px;
    .menu-item {
      gap: 10px;
    }
    .style-text {
      text-decoration: none;
      color: ${COLOR.text};
    }
  }
  .profile-content {
    text-align: right;
  }

  .light-text {
    color: ${COLOR.light};
  }
  .text {
    font-size: 14px;
    white-space: nowrap;
  }
  .bold {
    font-weight: bold;
  }
  .error-text {
    color: ${COLOR.danger};
  }

  .profile-icon {
    margin-right: 10px;
  }

  .package-info-icon {
    width: 18px;
    height: 18px;
  }

  .package-info-item {
    margin-right: 10px;
  }

  @media only screen and (min-width: 1440px) {
    .large-package-info-item {
      display: flex;
      gap: 8px;
    }

    .medium-package-info-item,
    .small-package-info-item,
    .medium-language-button {
      display: none;
    }

    .large-language-button {
      display: flex;
    }
  }

  @media only screen and (max-width: 1440px) and (min-width: 1200px) {
    .large-package-info-item,
    .small-package-info-item,
    .large-language-button {
      display: none;
    }

    .medium-package-info-item {
      display: flex;
      gap: 8px;
    }

    .medium-language-button {
      display: flex;
    }
  }

  @media only screen and (max-width: 1199px) {
    .large-package-info-item,
    .medium-package-info-item,
    .large-language-button {
      display: none;
    }

    .small-package-info-item {
      display: flex;
      gap: 8px;
    }

    .medium-language-button {
      display: flex;
    }
  }
`;

const StyledPolicyAndTermComponent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 16px;
  padding: 10px 30px 10px 10px;
`;

const StyledMenu = styled(Menu)`
  .menu-item {
    grid-gap: 10px;
  }

  .text-link {
    color: ${COLOR.text};
    text-decoration: none;
  }

  .logout-style {
    color: ${COLOR.danger};
  }
  .style-version {
    margin-left: 20px;
    color: ${COLOR.light};
  }

  .icon-download-container {
    margin: 0px 0px 12px -14px;
  }
`;

const StyledDownloadAppContainer = styled('div')`
  padding: 40px 80px;
  overflow: hidden;
  text-align: center;
  .title {
    font-size: 24px;
    font-weight: 700;
  }

  .description {
    font-size: 16px;
    font-weight: 400;
  }

  .description-2 {
    font-size: 16px;
    font-weight: 600;
    margin: 20px 0px;
  }

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    .qr-code {
      width: 154px;
      height: 154px;
    }
  }
`;

const StyledTooltip = styled(({ className, ...props }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Tooltip {...props} classes={{ popper: className }} placement="bottom" />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: COLOR.white,
    color: COLOR.text,
    boxShadow: BOX_SHADOW,
    fontSize: 14,
    fontWeight: 600,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: COLOR.white,
  },
}));

const StyledConfirmUseOldVersion = styled(Dialog)`
  min-width: 650px;

  .dialog-title {
    text-align: center;
  }

  .sub-title-wrapper {
    display: flex;
    justify-content: center;
  }

  .sub-title {
    color: ${COLOR.dark};
    margin: 5px 0;
    width: calc(100% * 2 / 3);
  }
`;

const StyledInfoUser = styled('div')`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${COLOR.divider};
  gap: 20px;

  .information-column {
    padding: 24px 0px 24px 24px;
    display: grid;
    width: 50%;
    grid-template-columns: 120px auto;
    grid-column-gap: 15px;
    grid-auto-rows: min-content;
    grid-row-gap: 15px;
  }

  .divider {
    color: ${COLOR.divider};
  }

  .content {
    font-weight: 500;
  }
`;

export {
  StyledWrapper,
  StyledMainPanel,
  StyledAppBar,
  StyledContent,
  StyledSidebar,
  StyledDrawer,
  StyledNavBar,
  StyledPolicyAndTermComponent,
  StyledMenu,
  StyledDownloadAppContainer,
  StyledTooltip,
  StyledConfirmUseOldVersion,
  StyledInfoUser,
};
