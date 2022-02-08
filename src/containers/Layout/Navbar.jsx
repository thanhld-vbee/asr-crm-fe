import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {
  LinearScale as PendingIcon,
  Menu as MenuIcon,
  ShoppingCartOutlined,
  StarOutline,
  WarningAmberRounded,
  PersonOutline,
  ArticleOutlined,
  InsertDriveFileOutlined,
  CallOutlined,
  LogoutOutlined,
  FilterCenterFocus,
} from '@mui/icons-material';
import {
  Button,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Divider,
  MenuItem,
  Menu,
  Dialog,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useKeycloak } from '@react-keycloak/web';
import BadgeAvatar from '@src/components/BadgeAvatar';
import ROUTES from '@src/constants/route';
import { ORDER_STATUS } from '@src/constants/order';
import {
  LANDING_PAGE_URL,
  CUSTOMER_SUPPORT_PHONE_NUMBER,
  SUPPORT_CENTER_URL,
  VBEE_FACEBOOK_SOCIAL_URL,
  VBEE_POLICY,
  VBEE_TERMS,
  VBEE_ZALO_URL,
  VBEE_HOTLINE,
  VBEE_APP,
} from '@src/configs';
import { delimitNumber } from '@src/utils/number';
import i18n from '@src/languages';
import { PACKAGE_LEVEL } from '@src/constants/package';
import IconFaceBook from '@src/assets/icons/icon-facebook.svg';
import IconZalo from '@src/assets/icons/icon-zalo.svg';
import IconDownload from '@src/assets/icons/download.png';
import QRDownloadApp from '@src/assets/images/qr_code.png';
import ImageAppStore from '@src/assets/images/app_store.png';
import ImageGooglePlay from '@src/assets/images/googleplay.png';
import ImageDotRed from '@src/assets/icons/dot-red.png';
import IconAlertTriangle from '@src/assets/icons/alert-triangle.svg';
import IconPackage from '@src/assets/icons/package.svg';
import IconAlertAlphabet from '@src/assets/icons/alert-alphabet.png';
import IconAlphabet from '@src/assets/icons/alphabet.png';
import IconBlackGift from '@src/assets/icons/black-gift.png';
import apis from '@src/apis';
import PackageInfoItem from './PackageInfoItem';
import {
  StyledAppBar,
  StyledNavBar,
  StyledMenu,
  StyledDownloadAppContainer,
} from './index.style';

const languages = [
  {
    value: 'vi',
    label: 'vietnamese',
    icon: 'https://vbee.s3.ap-southeast-1.amazonaws.com/images/nations/VietNam.png',
  },
  {
    value: 'en',
    label: 'english',
    icon: 'https://vbee.s3.ap-southeast-1.amazonaws.com/images/nations/UnitedKingdom.png',
  },
];

const Language = () => {
  const [anchorLanguage, setAnchorLanguage] = useState(null);
  const [language, setLanguage] = useState({});

  const { t } = useTranslation();

  const handleClickLanguage = (event) => setAnchorLanguage(event.currentTarget);

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng.value);
    setLanguage(lng);
    localStorage.setItem('lng', lng.value);
    setAnchorLanguage(null);
  };

  useEffect(() => {
    const defaultLanguageValue = localStorage.getItem('i18nextLng');
    const defaultLanguage = languages.find(
      (lng) => lng.value === defaultLanguageValue,
    );

    const currentLanguageValue = localStorage.getItem('lng');
    const currentLanguage = languages.find(
      (lng) => lng.value === currentLanguageValue,
    );

    if (currentLanguage) {
      handleChangeLanguage(currentLanguage);
      return;
    }
    if (defaultLanguage) {
      setLanguage(defaultLanguage);
      return;
    }
    handleChangeLanguage(languages[0]);
  }, []);

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Button
        color="secondary"
        className="language-text large-language-button"
        startIcon={
          <img className="language-icon" src={language.icon} alt="language" />
        }
        onClick={handleClickLanguage}
      >
        {t(language.label)}
      </Button>
      <IconButton
        onClick={handleClickLanguage}
        className="medium-language-button"
        color="secondary"
      >
        <img className="language-icon" src={language.icon} alt="language" />
      </IconButton>
      <Menu
        anchorEl={anchorLanguage}
        open={Boolean(anchorLanguage)}
        onClose={() => setAnchorLanguage(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {languages.map((lng) => (
          <MenuItem onClick={() => handleChangeLanguage(lng)}>
            <img
              style={{ width: 16, marginRight: 8 }}
              src={lng.icon}
              alt="language"
            />
            {t(lng.label)}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const Profile = () => {
  const [anchorProfile, setAnchorProfile] = useState(null);

  const { t } = useTranslation();
  const { keycloak } = useKeycloak();

  const { user } = useSelector((state) => state.auth);
  const [latestVersion, setLatestVersion] = useState('');
  const [openModalDownloadApp, setOpenModalDownloadApp] = useState(false);
  const handleOpenModalDownloadApp = () => setOpenModalDownloadApp(true);
  const handleCloseModalDownloadApp = () => setOpenModalDownloadApp(false);

  const handleGoToProfile = () => keycloak.accountManagement();
  const handleLogout = () => keycloak.logout({ redirectUri: LANDING_PAGE_URL });
  const handleClickProfile = (event) => setAnchorProfile(event.currentTarget);

  const fetchVersion = async () => {
    const data = await apis.version.getVersion();
    if (data && data.status) {
      const { version } = data.result;
      setLatestVersion(version);
    }
  };

  useEffect(() => {
    fetchVersion();
  }, []);

  return (
    <div className="profile">
      <div className="profile-content">
        <Typography className="text bold">
          {`${user.lastName} ${user.firstName}`}
        </Typography>
      </div>
      <IconButton onClick={handleClickProfile}>
        <BadgeAvatar
          img={user.avatar}
          active={keycloak && keycloak.authenticated}
          name={user.firstName || user.lastName}
          number={new Date(user.createdAt)}
        />
      </IconButton>
      <StyledMenu
        anchorEl={anchorProfile}
        open={Boolean(anchorProfile)}
        onClose={() => setAnchorProfile(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem classes={{ root: 'menu-item' }} onClick={handleGoToProfile}>
          <PersonOutline /> {t('profile')}
        </MenuItem>
        <MenuItem classes={{ root: 'menu-item' }} CallOutlined>
          <FilterCenterFocus />
          <a
            href={SUPPORT_CENTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            {t('supportCenter')}
          </a>
        </MenuItem>
        <MenuItem classes={{ root: 'menu-item' }} CallOutlined>
          <ArticleOutlined />
          <a
            href={VBEE_TERMS}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            {t('termOfUse')}
          </a>
        </MenuItem>
        <MenuItem classes={{ root: 'menu-item' }} divider>
          <InsertDriveFileOutlined />
          <a
            href={VBEE_POLICY}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            {t('policy')}
          </a>
        </MenuItem>
        <MenuItem classes={{ root: 'menu-item' }}>
          <CallOutlined />
          <Typography>
            {t('customerSupport')}: {CUSTOMER_SUPPORT_PHONE_NUMBER}
          </Typography>
        </MenuItem>
        <MenuItem classes={{ root: 'menu-item' }}>
          <CallOutlined />
          <Typography>
            {t('hotline')}: {VBEE_HOTLINE}
          </Typography>
        </MenuItem>
        <MenuItem classes={{ root: 'menu-item' }} divider>
          <a href={VBEE_FACEBOOK_SOCIAL_URL}>
            <img src={IconFaceBook} alt="icon-fb" />
          </a>
          <a href={VBEE_ZALO_URL}>
            <img src={IconZalo} alt="icon-zalo" />
          </a>
        </MenuItem>
        <MenuItem
          classes={{ root: 'menu-item' }}
          onClick={handleOpenModalDownloadApp}
          divider
        >
          <img src={IconDownload} alt="icon-fb" />
          <img
            src={ImageDotRed}
            alt="icon-fb"
            className="icon-download-container"
          />
          <Typography variant="subtitle1">{t('downloadApp')}</Typography>
        </MenuItem>
        <MenuItem
          classes={{ root: 'menu-item logout-style' }}
          onClick={handleLogout}
        >
          <LogoutOutlined />
          {t('logout')}
        </MenuItem>
        <div className="style-version">
          <Typography variant="caption">
            {t('ver')} <span>{latestVersion}</span>
          </Typography>
        </div>
      </StyledMenu>
      <Dialog open={openModalDownloadApp} onClose={handleCloseModalDownloadApp}>
        <StyledDownloadAppContainer>
          <p className="title">{VBEE_APP}</p>
          <p className="description">{t('downloadAppDescription')}</p>
          <div className="image-container">
            <img src={QRDownloadApp} alt="qr-code" className="qr-code" />
          </div>
          <p className="description-2">{t('scanQrOrApp')}:</p>
          <div className="image-container">
            <img src={ImageAppStore} alt="app-store" />
            <img src={ImageGooglePlay} alt="google-play" />
          </div>
        </StyledDownloadAppContainer>
      </Dialog>
    </div>
  );
};

const PackageInfo = () => {
  const { t } = useTranslation();

  const { user } = useSelector((state) => state.auth);
  const { remainingCharacters, lockCharacters, bonusCharacters } = useSelector(
    (state) => state.user,
  );

  const isExpiredPackage =
    user.packageExpiryDate && moment().isAfter(user.packageExpiryDate);

  return (
    <>
      <PackageInfoItem
        name="package"
        value={user.packageCode}
        icon={IconPackage}
      />
      <PackageInfoItem
        name="remainingCharacters"
        value={delimitNumber(remainingCharacters ?? 0)}
        icon={IconAlphabet}
      />
      {bonusCharacters > 0 && (
        <PackageInfoItem
          name="freeCharacters"
          value={delimitNumber(bonusCharacters)}
          icon={IconBlackGift}
        />
      )}
      {lockCharacters > 0 && (
        <PackageInfoItem
          name="expiryCharacters"
          value={delimitNumber(lockCharacters)}
          icon={IconAlertAlphabet}
          isDangerText
        />
      )}
      <PackageInfoItem
        name="expiryDate"
        value={
          (user.packageExpiryDate &&
            moment(user.packageExpiryDate).format('DD/MM/YYYY')) ||
          (!user.packageExpiryDate && user.packageCode && t('endless'))
        }
        icon={IconAlertTriangle}
        isDangerText={isExpiredPackage}
      />
    </>
  );
};

const OrderButton = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const { latestOrder, usingPackage } = useSelector((state) => state.user);
  const history = useHistory();

  const goToExactPackage = (code) =>
    history.push(`${ROUTES.PAYMENT}?package=${code}`);

  const goToPackages = () => history.push(ROUTES.PAYMENT);

  const isExpiredPackage =
    user.packageExpiryDate && moment().isAfter(user.packageExpiryDate);

  const getButton = () => {
    if (latestOrder.status === ORDER_STATUS.PENDING)
      return (
        <Button
          className="btn-order pending-button"
          startIcon={<PendingIcon />}
          onClick={() => goToExactPackage(latestOrder.package.code)}
        >
          {t('pending')}
        </Button>
      );

    if (isExpiredPackage && usingPackage.level !== PACKAGE_LEVEL.TRIAL)
      return (
        <Button
          className="btn-order error-button"
          startIcon={<WarningAmberRounded />}
          onClick={() => goToExactPackage(usingPackage.code)}
        >
          {t('renewalNow')}
        </Button>
      );

    if (usingPackage.level === PACKAGE_LEVEL.PRO)
      return (
        <Button
          className="btn-order"
          startIcon={<ShoppingCartOutlined />}
          onClick={() => goToExactPackage(usingPackage.code)}
        >
          {t('buyMore')}
        </Button>
      );

    return (
      <Button
        className="btn-order"
        startIcon={<StarOutline />}
        onClick={goToPackages}
      >
        {t('upgrade')}
      </Button>
    );
  };

  return (
    <Box className="btn-order">
      {getButton()}
      {user.packageCode && (
        <Divider
          sx={{ display: { xs: 'none', sm: 'block' } }}
          orientation="vertical"
          variant="middle"
          flexItem
        />
      )}
    </Box>
  );
};

const Navbar = ({ openSidebar, handleOpenSidebar }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <StyledAppBar openSidebar={openSidebar}>
      <Toolbar className="container">
        {!openSidebar && (
          <IconButton color="secondary" onClick={handleOpenSidebar}>
            <MenuIcon />
          </IconButton>
        )}
        <StyledNavBar>
          <Box
            sx={{ gap: { xs: '24px', lg: '12px', xl: '24px' } }}
            className="navbar-item"
          >
            <OrderButton />
            {user.packageCode && <PackageInfo />}
          </Box>
          <Box
            sx={{ gap: { xs: '24px', lg: '4px', xl: '24px' } }}
            className="navbar-item"
          >
            <Language />
            <Profile />
          </Box>
        </StyledNavBar>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
