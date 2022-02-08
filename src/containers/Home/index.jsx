import React from 'react';
import { Button } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';

const Home = () => {
  const { keycloak } = useKeycloak();

  return (
    <div>
      {!keycloak.authenticated && (
        <>
          <Button onClick={() => keycloak.login()} variant="contained">
            Login
          </Button>
          <Button onClick={() => keycloak.register()} variant="outlined">
            Register
          </Button>
        </>
      )}
    </div>
  );
};

export default Home;
