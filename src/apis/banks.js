import { RESOURCE } from '@src/constants';
import api from './api';

const getTransferBanks = async () => {
  const response = await api({
    method: 'GET',
    url: `${RESOURCE.BANKS}/transfer`,
  });
  return response;
};

const getBanks = async () => {
  const response = await api({
    method: 'GET',
    url: RESOURCE.BANKS,
  });
  return response;
};

export { getTransferBanks, getBanks };
