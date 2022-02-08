const getCollapseInitialState = (routes) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const route of routes) {
    if (route.collapse && getCollapseInitialState(route.items)) return true;
  }
  return false;
};

const getCollapseStates = (routes) => {
  let initialState = {};
  routes.map((route) => {
    if (route.collapse) {
      initialState = {
        [route.name]: getCollapseInitialState(route.items),
        ...getCollapseStates(route.items),
        ...initialState,
      };
    }
    return null;
  });
  return initialState;
};

export { getCollapseInitialState, getCollapseStates };
