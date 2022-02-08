import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import Layout from '@src/containers/Layout';
import { Box, CircularProgress } from '@mui/material';
import actions from '@src/redux/actions';
import { HOME_PAGE_URL, LANDING_PAGE_URL } from '@src/configs';
import appRoutes from './appRoutes';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const PrivateApp = () => {
  const privateRoutes = appRoutes.filter((route) => route.isPrivate);

  return (
    <Layout>
      <Switch>
        {privateRoutes.map((privateRoute) => (
          <PrivateRoute
            path={privateRoute.path}
            component={privateRoute.component}
            exact
            key={privateRoute.path}
          />
        ))}
        <Route render={() => window.location.assign(HOME_PAGE_URL)} />
      </Switch>
    </Layout>
  );
};

const AppRouter = () => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const { initialized, keycloak } = useKeycloak();

  const { verifying } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!nprogress.isStarted()) nprogress.start();

  useEffect(() => {
    nprogress.done();
  });

  useEffect(() => {
    dispatch(actions.featureFlag.getFeatureFlags());
  }, []);

  useEffect(() => {
    if (keycloak.token) {
      dispatch(actions.auth.verifyToken(keycloak.token));
    }
    setIsFirstTime(false);
  }, [keycloak.token]);

  if (!initialized || verifying || isFirstTime) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const publicRoutes = appRoutes.filter((route) => !route.isPrivate);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => window.location.assign(LANDING_PAGE_URL)}
        />
        {publicRoutes.map((publicRoute) => (
          <PublicRoute
            exact
            path={publicRoute.path}
            component={publicRoute.component}
            restricted={publicRoute.restricted}
            key={publicRoute.path}
          />
        ))}

        <PrivateRoute component={PrivateApp} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
