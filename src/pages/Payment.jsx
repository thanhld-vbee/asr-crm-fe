import React from 'react';
import { useLocation } from 'react-router-dom';
import camelcaseKeys from 'camelcase-keys';
import queryString from 'query-string';

import BuyPackageContainer from '@src/containers/BuyPackage';
import PaymentContainer from '@src/containers/Payment';

const Payment = () => {
  const location = useLocation();

  const { orderId, package: packageCode } = camelcaseKeys(
    queryString.parse(location.search) || {},
  );

  if (orderId || packageCode) return <PaymentContainer />;

  return <BuyPackageContainer />;
};

export default Payment;
