import { RESOURCE } from '@src/constants';
import api from './api';

const getPaymentMethods = async () => {
  const packages = await api({
    method: 'GET',
    url: RESOURCE.PAYMENT_METHODS,
  });
  return packages;
};

export { getPaymentMethods };
