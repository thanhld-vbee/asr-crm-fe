import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import ROUTE from '@src/constants/route';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { accessToken } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        accessToken && restricted ? (
          <Redirect to={ROUTE.TTS} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
