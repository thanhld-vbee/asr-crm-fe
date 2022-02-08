export const actionTypes = {
  PUSH_NOTI: 'PUSH_NOTI',
  RESET_NOTI: 'RESET_NOTI',
};

export const push = ({ message, code, severity, value }) => ({
  type: actionTypes.PUSH_NOTI,
  message,
  code,
  severity,
  value,
});

export const reset = () => ({ type: actionTypes.RESET_NOTI });
