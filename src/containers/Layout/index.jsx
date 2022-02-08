import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import camelcaseKeys from 'camelcase-keys';
import { NOTIFICATION_URL } from '@src/configs';
import {
  PING_INTERVAL,
  SYNTHESIS_STATUS,
  WS_TYPE,
  WS_ORDER_STATUS,
} from '@src/constants/websocket';
import { getCookie } from '@src/utils/cookie';
import { useDispatch, useSelector } from 'react-redux';
import actions from '@src/redux/actions';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Content from './Content';
import { StyledWrapper, StyledMainPanel } from './index.style';

const Layout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(true);

  const { remainingCharacters, bonusCharacters } = useSelector(
    (state) => state.user,
  );
  const { user } = useSelector((state) => state.auth);

  const handleOpenSidebar = () => setOpenSidebar(true);
  const accessToken = getCookie('accessToken');

  const ws = useRef(null);
  const remainingCharactersRef = useRef(remainingCharacters);
  const bonusCharactersRef = useRef(bonusCharacters);
  const userRef = useRef(user);

  const dispatch = useDispatch();

  useEffect(() => {
    remainingCharactersRef.current = remainingCharacters;
  }, [remainingCharacters]);

  useEffect(() => {
    bonusCharactersRef.current = bonusCharacters;
  }, [bonusCharacters]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    ws.current = new WebSocket(NOTIFICATION_URL);
    let pingInterval;
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ type: WS_TYPE.INIT, accessToken }));
      pingInterval = setInterval(() => {
        ws.current.send(JSON.stringify({ type: WS_TYPE.PING }));
      }, PING_INTERVAL);
    };

    ws.current.onmessage = (res) => {
      const responseData = camelcaseKeys(JSON.parse(res.data), { deep: true });
      const { type, result } = responseData;

      const handleSynthesis = () => {
        const { requestId, audioLink, status, characters, progress } = result;

        switch (status) {
          case SYNTHESIS_STATUS.CREATED: {
            let bonus = bonusCharactersRef.current;
            let remaining = remainingCharactersRef.current;

            if (characters >= bonusCharactersRef.current) {
              bonus = 0;
              remaining -= characters - bonus;
            } else {
              bonus -= characters;
            }
            dispatch(
              actions.user.updateUserCharacters({
                remainingCharacters: remaining,
                bonusCharacters: bonus,
              }),
            );
            break;
          }
          case SYNTHESIS_STATUS.SUCCESS:
            dispatch(
              actions.request.addSynthesisResponse(
                requestId,
                audioLink,
                status,
              ),
            );
            break;
          case SYNTHESIS_STATUS.FAILURE: {
            const paid = result.paidCharacters || 0;
            const bonus = result.bonusCharacters || 0;
            dispatch(
              actions.request.addSynthesisResponse(
                requestId,
                audioLink,
                status,
              ),
            );
            dispatch(
              actions.user.updateUserCharacters({
                remainingCharacters: remainingCharactersRef.current + paid,
                bonusCharacters: bonusCharactersRef.current + bonus,
              }),
            );
            break;
          }
          case SYNTHESIS_STATUS.IN_PROGRESS:
            dispatch(
              actions.request.addSynthesisResponse(
                requestId,
                audioLink,
                status,
                progress,
              ),
            );
            break;
          default:
            break;
        }
      };

      const handleOrder = () => {
        const {
          packageCode,
          packageExpiryDate,
          status,
          remainingCharacters: remaining,
          bonusCharacters: bonus,
          lockCharacters,
        } = result;
        switch (status) {
          case WS_ORDER_STATUS.PAID: {
            if (remaining || bonus || lockCharacters) {
              dispatch(
                actions.user.updateUserCharacters({
                  remainingCharacters: remaining,
                  bonusCharacters: bonus,
                  lockCharacters,
                }),
              );
            }

            if (packageCode) {
              dispatch(
                actions.auth.updateUserInfo({
                  ...userRef.current,
                  packageCode,
                  packageExpiryDate,
                }),
              );
              dispatch(actions.user.getUsingPackage(packageCode));
              dispatch(actions.user.getLatestOrder(userRef.current.id));
            }
            break;
          }

          case WS_ORDER_STATUS.CANCEL: {
            dispatch(actions.user.getLatestOrder(userRef.current.id));
            dispatch(
              actions.noti.push({
                severity: 'success',
                message: 'notiCanceledOrder',
              }),
            );
            break;
          }

          default:
            break;
        }
      };

      switch (type) {
        case WS_TYPE.SYNTHESIS: {
          handleSynthesis();
          break;
        }

        case WS_TYPE.ORDER: {
          handleOrder();
          break;
        }

        default:
          break;
      }
    };

    ws.current.onclose = () => {
      // eslint-disable-next-line no-console
      console.log('Websocket is closed.');
      clearInterval(pingInterval);
    };
  }, []);

  const handleCloseSidebar = () => setOpenSidebar(false);

  return (
    <StyledWrapper>
      <Sidebar
        openSidebar={openSidebar}
        handleOpenSidebar={handleOpenSidebar}
        handleCloseSidebar={handleCloseSidebar}
      />
      <StyledMainPanel className={classNames({ 'open-sidebar': openSidebar })}>
        <Navbar
          openSidebar={openSidebar}
          handleOpenSidebar={handleOpenSidebar}
        />
        <Content openSidebar={openSidebar}>{children}</Content>
      </StyledMainPanel>
    </StyledWrapper>
  );
};

export default Layout;
