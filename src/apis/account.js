import api from './api';

const getMe = async () => {
  const response = await api({
    method: 'GET',
    url: '/me',
  });

  return response;
};

const verifyToken = async (accessToken) => {
  const response = await api({
    method: 'GET',
    url: '/auths/verify',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
};

export { getMe, verifyToken };
