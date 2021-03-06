const WS_TYPE = {
  ORDER: 'ORDER',
  SYNTHESIS: 'SYNTHESIS',
  PING: 'PING',
  INIT: 'INIT',
};

const SYNTHESIS_STATUS = {
  CREATED: 'CREATED',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  IN_PROGRESS: 'IN_PROGRESS',
};

const WS_ORDER_STATUS = {
  CREATED: 'CREATED',
  PAID: 'PAID',
  CANCEL: 'CANCEL',
};

const PING_INTERVAL = 5 * 1000;
const FETCH_REQUESTS_INTERVAL = 10 * 1000;

export {
  WS_TYPE,
  PING_INTERVAL,
  FETCH_REQUESTS_INTERVAL,
  SYNTHESIS_STATUS,
  WS_ORDER_STATUS,
};
