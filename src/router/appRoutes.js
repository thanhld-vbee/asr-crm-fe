import {
  Home as HomeIcon,
  GridViewOutlined as DashboardIcon,
  GraphicEqOutlined as TTSIcon,
  ShoppingCartOutlined as PackageIcon,
  AttachMoney as AffiliateIcon,
  HelpOutlineOutlined as FAQIcon,
  LocalOfferOutlined as LiveSupportIcon,
} from '@mui/icons-material';
import Home from '@src/pages/Home';
import ComingSoon from '@src/pages/ComingSoon';
import TTS from '@src/pages/TTS';
import Payment from '@src/pages/Payment';

import routes from '@src/constants/route';
import AdvancedTTS from '@src/pages/AdvancedTTS';

export default [
  {
    name: 'home',
    path: routes.HOME,
    component: Home,
    icon: HomeIcon,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
  {
    name: 'dashboard',
    path: routes.DASHBOARD,
    component: ComingSoon,
    icon: DashboardIcon,
    exact: true,
    restricted: false,
    isPrivate: true,
    sidebar: true,
  },
  {
    name: 'buyPackage',
    path: routes.PAYMENT,
    component: Payment,
    icon: PackageIcon,
    exact: true,
    restricted: false,
    isPrivate: true,
    sidebar: true,
    banner: true,
  },
  {
    name: 'convertText',
    path: routes.TTS,
    component: TTS,
    icon: TTSIcon,
    exact: true,
    restricted: true,
    isPrivate: true,
    sidebar: true,
  },
  {
    name: 'affiliate',
    path: routes.AFFILIATE,
    component: ComingSoon,
    icon: AffiliateIcon,
    exact: true,
    restricted: false,
    isPrivate: true,
    sidebar: true,
  },
  {
    name: 'onlineSupport',
    path: routes.LIVE_SUPPORT,
    component: ComingSoon,
    icon: LiveSupportIcon,
    exact: true,
    restricted: false,
    isPrivate: true,
    sidebar: true,
  },
  {
    name: 'faq',
    path: routes.FAQ,
    component: ComingSoon,
    icon: FAQIcon,
    exact: true,
    restricted: false,
    isPrivate: true,
    sidebar: false,
  },
  {
    name: 'otherServices',
    path: routes.OTHER_SERVICES,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
    sidebar: false,
  },
  {
    name: 'advanceTTS',
    path: routes.ADVANCED_TTS,
    component: AdvancedTTS,
    exact: true,
    restricted: false,
    isPrivate: true,
    sidebar: false,
  },
];
