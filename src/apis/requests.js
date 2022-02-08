import { PAGINATION_LIMIT, RESOURCE } from '@src/constants';
import { omitIsNil } from '@src/utils/omit';
import api from './api';

export const getRequests = async ({
  search,
  offset,
  limit = PAGINATION_LIMIT,
  fields,
  sort,
  startDate,
  endDate,
  status,
}) => {
  const params = omitIsNil({
    search,
    offset,
    limit,
    fields,
    sort,
    startDate,
    endDate,
    status,
  });

  const response = await api({
    method: 'GET',
    url: RESOURCE.REQUESTS,
    params,
  });
  return response;
};

export const getRequest = async (requestId) => {
  const response = await api({
    method: 'GET',
    url: `${RESOURCE.REQUESTS}/${requestId}`,
  });
  return response;
};
