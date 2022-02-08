import api from '@src/apis/api';
import { LANDING_PAGE_URL } from '@src/configs';
import { setCookie } from '@src/utils/cookie';

const handleReceivingTokens = (tokens) => {
  api.defaults.headers.common.Authorization = `Bearer ${tokens.token}`;

  setCookie('accessToken', tokens.token);
  setCookie('refreshToken', tokens.refreshToken);
};

const handleEvent = (event) => {
  const redirectedEvents = [
    'onInitError',
    'onAuthRefreshError',
    'onAuthLogout',
  ];
  if (redirectedEvents.includes(event))
    window.location.assign(LANDING_PAGE_URL);
};

export { handleReceivingTokens, handleEvent };
