import { RESOURCE } from '@src/constants';
import { CRAWL_NEWS_BY_URL } from '@src/configs';
import axios from 'axios';
import api from './api';

export const getUploadPresignedUrl = async (extension) => {
  const response = await api({
    method: 'GET',
    url: RESOURCE.UPLOAD_PRESIGNED_URL,
    params: { extension },
  });
  return response;
};

export const getSharingPresignedUrl = async (bucket, key) => {
  const response = await api({
    method: 'GET',
    url: RESOURCE.SHARING_PRESIGNED_URL,
    params: { bucket, key },
  });
  return response;
};

export const uploadByPresignedUrl = async (url, file) => {
  const response = await axios({
    method: 'PUT',
    url,
    data: file,
  });
  return response;
};

export const crawlNewsByUrl = async (link) => {
  try {
    const response = await api({
      method: 'POST',
      url: `${CRAWL_NEWS_BY_URL}/api/crawlers/link`,
      data: { link },
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};
