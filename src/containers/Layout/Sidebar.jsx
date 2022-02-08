import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, matchPath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  ArrowBack,
  ArrowDropDown,
  ArrowDropUp,
  FolderOpen,
  HelpOutlineOutlined,
} from '@mui/icons-material';
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import {
  getCollapseStates,
  getCollapseInitialState,
} from '@src/services/sidebar';
import actions from '@src/redux/actions';
import { VERSION } from '@src/constants';
import { DOCUMENT_LINK, HOME_PAGE_URL, V3_URL } from '@src/configs';
import ROUTES from '@src/constants/route';
import appRoutes from '@src/router/appRoutes';
import logo from '@src/assets/logo/logoHr512.png';
import vbeeV3Logo from '@src/assets/icons/vbee-icon-yellow.png';
import vbeeGrayIcon from '@src/assets/icons/vbee-icon-gray.svg';
import vbeeWhiteIcon from '@src/assets/icons/vbee-icon-white.svg';
import apis from '@src/apis';
import ConfirmUseOldVersionDialog from './ConfirmUseOldVersion';

import { StyledSidebar, StyledDrawer } from './index.style';
import SidebarImgIcon from './Icon';

const Logo = () => (
  <div className="logo">
    <img
      src={logo}
      alt="vbee tts logo"
      className="logo-img"
      onClick={() => window.location.assign(HOME_PAGE_URL)}
    />
  </div>
);

const Sidebar = ({ openSidebar, handleCloseSidebar }) => {
  const [collapseState, setCollapseState] = useState({});
  const [openConfirmUseOldVersion, setOpenConfirmOldVersion] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    setCollapseState(getCollapseStates(appRoutes));
  }, []);

  const handleOpenConfirmOldVersion = () => {
    if (user?.version === VERSION.V3) window.location.assign(V3_URL);
    else setOpenConfirmOldVersion(true);
  };
  const handleCloseConfirmOldVersion = () => setOpenConfirmOldVersion(false);

  const handleUseOldVersion = async () => {
    const { status } = await apis.user.switchVersion();
    if (status) {
      window.location.assign(V3_URL);
    } else
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'switchVersionError',
        }),
      );
  };

  const activeRoute = (routePath) =>
    matchPath(location.pathname, { path: routePath, exact: true });

  const sidebarRoute = appRoutes.filter((route) => route.sidebar);

  const createLinks = (aRoutes) =>
    aRoutes.map((route) => {
      if (route.collapse) {
        const collapse = {};
        collapse[route.name] = !collapseState[route.name];

        return (
          <ListItem key={route.name} className="item">
            <NavLink
              to="#"
              className={classNames('item-link', {
                'collapse-active': getCollapseInitialState(route.items),
              })}
              onClick={(e) => {
                e.preventDefault();
                setCollapseState(collapse);
              }}
            >
              <route.icon className="item-icon" />
              <ListItemText
                primary={t(route.name)}
                secondary={
                  collapseState[route.name] ? (
                    <ArrowDropUp className="caret" />
                  ) : (
                    <ArrowDropDown className="caret" />
                  )
                }
                disableTypography
                className="item"
              />
            </NavLink>
            <Collapse in={collapseState[route.state]} unmountOnExit>
              <List className="list collapse-list">
                {createLinks(route.items)}
              </List>
            </Collapse>
          </ListItem>
        );
      }

      return (
        <ListItem key={route.name} className="item">
          <NavLink
            to={route.path}
            className={classNames('item-link', {
              'active-link': activeRoute(route.path),
            })}
          >
            <route.icon className="item-icon" />
            <ListItemText
              primary={t(route.name)}
              disableTypography
              className="item-text"
            />
          </NavLink>
        </ListItem>
      );
    });

  const renderSideBarItems = () => (
    <div className="sidebar-wrapper">
      {user?.isMigrated && (
        <Button
          variant="outlined"
          color="secondary"
          className="convert-ole-version-button"
          onClick={handleOpenConfirmOldVersion}
        >
          <img src={vbeeV3Logo} alt="vbee v3 logo" className="vbee-v3-img" />
          {t('useOldVersion')}
        </Button>
      )}
      <List className="list">{createLinks(sidebarRoute)}</List>
      <Divider sx={{ my: '28px', mx: 'auto', width: '80%' }} />
      <a
        href={DOCUMENT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames('item-link', {
          'active-link': activeRoute(DOCUMENT_LINK),
        })}
      >
        <Box sx={{ display: 'flex', gap: '16px', py: '3px' }}>
          <FolderOpen />
          <Typography>{t('document')}</Typography>
        </Box>
      </a>
      <NavLink
        to={ROUTES.FAQ}
        className={classNames('item-link', {
          'active-link': activeRoute(ROUTES.FAQ),
        })}
      >
        <HelpOutlineOutlined className="item-icon" />
        <ListItemText
          primary={t('faq')}
          disableTypography
          className="item-text"
        />
      </NavLink>
      <NavLink
        to={ROUTES.OTHER_SERVICES}
        className={classNames('item-link', {
          'active-link': activeRoute(ROUTES.OTHER_SERVICES),
        })}
      >
        <Box sx={{ display: 'flex', gap: '16px', py: '3px' }}>
          <SidebarImgIcon
            src={
              activeRoute(ROUTES.OTHER_SERVICES) ? vbeeWhiteIcon : vbeeGrayIcon
            }
            name={t('otherServices')}
          />
        </Box>
      </NavLink>
    </div>
  );

  return (
    <>
      <StyledDrawer
        sx={{ display: { md: 'none', xs: 'block' } }}
        variant="temporary"
        anchor="right"
        open={openSidebar}
        onClose={handleCloseSidebar}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledSidebar>
          <div className="brand">
            <Logo />
          </div>
          {renderSideBarItems()}
        </StyledSidebar>
      </StyledDrawer>

      <StyledDrawer
        sx={{ display: { md: 'block', xs: 'none' } }}
        variant="persistent"
        anchor="left"
        open={openSidebar}
      >
        <StyledSidebar>
          <div className="brand">
            <Logo />
            <IconButton color="secondary" onClick={handleCloseSidebar}>
              <ArrowBack />
            </IconButton>
          </div>
          {renderSideBarItems()}
        </StyledSidebar>
      </StyledDrawer>
      <ConfirmUseOldVersionDialog
        open={openConfirmUseOldVersion}
        user={user}
        onClose={handleCloseConfirmOldVersion}
        onConfirm={handleUseOldVersion}
      />
    </>
  );
};

export default Sidebar;
