import { PAGINATION_LIMIT, RESOURCE } from '@src/constants';
import api from './api';

const createOrder = async ({
  packageId,
  paymentMethodId,
  bankCode,
  callbackUrl,
  downgradePackage,
}) => {
  // TODO: check response data
  try {
    const response = await api({
      method: 'POST',
      url: RESOURCE.ORDERS,
      data: {
        packageId,
        paymentMethodId,
        bankCode,
        callbackUrl,
        downgradePackage,
      },
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const getOrderState = async (token) => {
  const response = await api({
    method: 'GET',
    url: `${RESOURCE.ORDERS}/state`,
    params: { token },
  });
  return response;
};

const getOrderById = async (orderId) => {
  const response = await api({
    method: 'GET',
    url: `${RESOURCE.ORDERS}/${orderId}`,
  });
  return response;
};

const getOrders = async ({
  userId,
  packageLevel,
  packageStatus,
  startDate,
  endDate,
  search,
  searchFields,
  offset,
  limit = PAGINATION_LIMIT,
  fields,
  sort,
}) => {
  const response = await api({
    method: 'GET',
    url: RESOURCE.ORDERS,
    params: {
      userId,
      packageLevel,
      packageStatus,
      startDate,
      endDate,
      search,
      searchFields,
      offset,
      limit,
      fields,
      sort,
    },
  });
  return response;
};

const cancelOrder = async (orderId) => {
  const response = await api({
    method: 'POST',
    url: `${RESOURCE.ORDERS}/${orderId}/cancel`,
  });
  return response;
};

const confirmByCustomer = async (orderId) => {
  const response = await api({
    method: 'POST',
    url: `${RESOURCE.ORDERS}/${orderId}/confirm`,
  });
  return response;
};

const createInvoice = async (
  orderId,
  { companyName, companyAddress, companyTax, companyEmail },
) => {
  const response = await api({
    method: 'POST',
    url: `${RESOURCE.ORDERS}/${orderId}/invoices`,
    data: {
      companyName,
      companyAddress,
      companyTax,
      companyEmail,
    },
  });
  return response;
};

export {
  createOrder,
  getOrderState,
  getOrderById,
  getOrders,
  cancelOrder,
  confirmByCustomer,
  createInvoice,
};
