import { RESOURCE } from '@src/constants';
import api from './api';

export const createSynthesis = async (payload) => {
  // eslint-disable-next-line no-param-reassign
  if (payload.volume) delete payload.volume;

  const response = await api({
    method: 'POST',
    url: RESOURCE.SYNTHESIS,
    data: payload,
  });
  return response;
};
