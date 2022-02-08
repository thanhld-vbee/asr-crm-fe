import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import Keycloak from 'keycloak-js';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { SnackbarProvider } from 'notistack';

import store from './redux/store';
import AppRouter from './router';
import theme from './styles/theme';
import { IAM_URL, IAM_REALM, IAM_CLIENT_ID } from './configs';
import { getCookie } from './utils/cookie';
import { handleEvent, handleReceivingTokens } from './services/auth';
import NotiHandler from './errors/NotiHandler';

const keycloak = Keycloak({
  url: `${IAM_URL}/auth`,
  realm: IAM_REALM,
  clientId: IAM_CLIENT_ID,
});

const notistackRef = React.createRef();

const App = () => {
  const refreshToken = getCookie('refreshToken');

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'check-sso',
        refreshToken,
      }}
      onTokens={handleReceivingTokens}
      onEvent={handleEvent}
    >
      <ThemeProvider theme={theme}>
        <Provider store={store()}>
          <SnackbarProvider preventDuplicate maxSnack={3} ref={notistackRef}>
            <NotiHandler>
              <AppRouter />
            </NotiHandler>
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </ReactKeycloakProvider>
  );
};

export default App;
