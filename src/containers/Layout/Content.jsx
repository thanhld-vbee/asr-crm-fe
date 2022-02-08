import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import appRoutes from '@src/router/appRoutes';

import Banner from './Banner';
import { StyledContent } from './index.style';

const Content = ({ children, openSidebar }) => {
  const location = useLocation();

  const currentRoute = appRoutes.find((route) =>
    matchPath(location.pathname, { path: route.path, exact: true }),
  );

  return (
    <StyledContent openSidebar={openSidebar}>
      {currentRoute?.banner && <Banner />}
      <div className="content-layout">{children}</div>
    </StyledContent>
  );
};

export default Content;
