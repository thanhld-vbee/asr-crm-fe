import { RESOURCE } from '@src/constants';
import api from './api';

const switchVersion = async () => {
  const response = await api({
    method: 'POST',
    url: RESOURCE.SWITCH_VERSION,
  });
  return response;
};

export { switchVersion };
