import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { getMessage } from './message';
import actions from '../redux/actions';

const NotiHandler = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { code, message, severity, value } = useSelector((state) => state.noti);

  useEffect(() => {
    let msg;
    if (message) msg = message;
    else if (code) msg = getMessage(code);

    if (msg && severity) {
      enqueueSnackbar(t(msg, { value }), { variant: severity });
      dispatch(actions.noti.reset());
    }
  }, [code, message]);

  return <>{children}</>;
};

export default NotiHandler;
