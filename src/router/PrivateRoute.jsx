import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import { LANDING_PAGE_URL } from '@src/configs';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { verifying, accessToken } = useSelector((state) => state.auth);
  const { keycloak } = useKeycloak();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (accessToken) return <Component {...props} />;
        if (!verifying && !accessToken && !keycloak.token)
          window.location.assign(LANDING_PAGE_URL);
        return null;
      }}
    />
  );
};

export default PrivateRoute;
