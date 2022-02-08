import { RESOURCE } from '@src/constants';
import { IAM_CLIENT_ID } from '@src/configs';
import api from './api';

const getFeatureFlags = async () => {
  const { status, result } = await api({
    method: 'GET',
    url: RESOURCE.FEATURE_FLAG,
    headers: { provider: IAM_CLIENT_ID },
  });

  return status ? result.featureFlags : [];
};

export { getFeatureFlags };
