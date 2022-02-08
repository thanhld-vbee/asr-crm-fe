import { RESOURCE } from '@src/constants';
import api from './api';

const getVersion = async () => {
  const response = await api({
    method: 'GET',
    url: RESOURCE.VERSION,
  });
  return response;
};

export { getVersion };
