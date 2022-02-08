import { ERROR_CODE } from './code';

export const getMessage = (code) => {
  switch (code) {
    case ERROR_CODE.UNCANCELED_ORDER:
      return 'uncanceledOrderMessage';
    default:
      return '';
  }
};
