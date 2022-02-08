const VERSION = {
  STUDIO: 'STUDIO',
  V3: 'V3',
};

const RESOURCE = {
  USERS: '/users',
  VOICES: '/voices',
  PACKAGES: '/packages',
  PAYMENT_METHODS: '/payment-methods',
  BANKS: '/banks',
  ORDERS: '/orders',
  LANGUAGES: '/languages',
  UPLOAD_PRESIGNED_URL: '/presigned-url-for-uploading',
  SHARING_PRESIGNED_URL: '/presigned-url-for-sharing',
  REQUESTS: '/requests',
  SYNTHESIS: '/synthesis',
  BACKGROUND_MUSICS: '/background-musics',
  DICTIONARY: '/dictionary',
  FEATURE_FLAG: '/feature-flags',
  VERSION: '/version',
  SWITCH_VERSION: '/users/switch-version',
};

const PAGINATION_LIMIT = 5;

const ZERO_BREAK_TIME_REGEX = new RegExp('<break time=0s/>');

export { VERSION, RESOURCE, PAGINATION_LIMIT, ZERO_BREAK_TIME_REGEX };
