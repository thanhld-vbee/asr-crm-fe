import { RESOURCE } from '@src/constants';
import api from './api';

const getPackages = async ({
  type,
  code,
  search,
  searchFields,
  offset,
  limit,
  fields,
  sort,
}) => {
  const response = await api({
    method: 'GET',
    url: RESOURCE.PACKAGES,
    params: { type, code, search, searchFields, offset, limit, fields, sort },
  });
  return response;
};

export { getPackages };
