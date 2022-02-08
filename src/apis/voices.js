import { RESOURCE } from '@src/constants';
import { omitIsNil } from '@src/utils/omit';
import api from './api';

const getVoices = async ({ languageCode, gender, offset, limit }) => {
  const params = omitIsNil({ languageCode, gender, offset, limit });

  const response = await api({
    method: 'GET',
    url: RESOURCE.VOICES,
    params,
  });
  return response;
};

const getLanguages = async () => {
  const response = await api({
    method: 'GET',
    url: RESOURCE.LANGUAGES,
  });
  return response;
};

const createBackgroundMusic = async (name, link) => {
  const response = await api({
    method: 'POST',
    url: RESOURCE.BACKGROUND_MUSICS,
    data: { name, link },
  });
  return response;
};

const getBackgroundMusics = async () => {
  const response = await api({
    method: 'GET',
    url: RESOURCE.BACKGROUND_MUSICS,
  });
  return response;
};

const createDictionary = async (words) => {
  const response = await api({
    method: 'POST',
    url: RESOURCE.DICTIONARY,
    data: { words },
  });
  return response;
};

const getDictionary = async () => {
  const response = await api({
    method: 'GET',
    url: RESOURCE.DICTIONARY,
  });
  return response;
};

export {
  getVoices,
  getLanguages,
  createBackgroundMusic,
  getBackgroundMusics,
  createDictionary,
  getDictionary,
};
