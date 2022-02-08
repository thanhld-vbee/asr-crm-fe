import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import queryString from 'query-string';
import camelcaseKeys from 'camelcase-keys';
import { Step, StepLabel, Grid } from '@mui/material';
import { CRM_URL } from '@src/configs';
import { ORDER_STATE, ORDER_STATUS } from '@src/constants/order';
import { PAYMENT_METHOD_TYPE, PAYMENT_STEP } from '@src/constants/payment';
import ROUTES from '@src/constants/route';
import apis from '@src/apis';
import ComeBack from '@src/components/ComeBack';
import actions from '@src/redux/actions';
import { ERROR_CODE } from '@src/errors/code';
import Card from '@src/components/Card';

import {
  StyledPaymentWrapper,
  StyledStepConnector,
  StyledStepIcon,
  StyledStepper,
} from './index.style';
import PaymentBox from './PaymentBox';
import OrderBox from './OrderBox';
import PaymentNotificationDialogs from './PaymentNotificationDialogs';

const steps = ['choosePackage', 'payment', 'completed'];

const CustomStepIcon = (props) => {
  const { icon, active, completed } = props;
  return (
    <StyledStepIcon active={active} completed={completed}>
      {icon}
    </StyledStepIcon>
  );
};

const DIALOG_NAMES = {
  NOT_SELECTED_BANK: 'notSelectedBank',
  CONFIRM_TRANSACTION: 'confirmTransaction',
  PENDING_ORDER: 'pendingOrder',
  DOWNGRADE_PACKAGE: 'downgradePackage',
  GET_INVOICE: 'getInvoice',
};

const Payment = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(PAYMENT_STEP.PAYMENT);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
  const [selectedBank, setSelectedBank] = useState();
  const [isBankTransfer, setIsBankTransfer] = useState(false);
  const [openDialog, setOpenDialog] = useState({});
  const [currPackage, setCurrPackage] = useState({});
  const [hasPaid, setHasPaid] = useState(false);
  const [downgradePackage, setDowngradePackage] = useState(false);
  const [loading, setLoading] = useState({
    transfer: false,
    cancelOrder: false,
  });
  const [isTransferOrder, setIsTransferOrder] = useState(false);

  const { latestOrder, usingPackage } = useSelector((state) => state.user);

  const handleComeBackToPackage = () => {
    history.replace();
    setActiveStep(PAYMENT_STEP.PAYMENT);
    setHasPaid(false);
  };

  const createOrder = async (bankCode, callbackUrl) => {
    setLoading({ ...loading, transfer: true });
    const data = await apis.orders.createOrder({
      packageId: currPackage.id,
      paymentMethodId: selectedPaymentMethod.id,
      bankCode,
      callbackUrl,
      downgradePackage,
    });
    setLoading({ ...loading, transfer: false });
    if (!data.status) {
      dispatch(
        actions.noti.push({ severity: 'error', message: 'buyPackageFailure' }),
      );
      handleComeBackToPackage();
      return;
    }
    if (isBankTransfer) {
      setIsTransferOrder(true);
      dispatch(actions.user.getLatestOrderSuccess(data.result));
      return;
    }
    window.location.href = data.result.paymentLink;
  };

  const handleCloseDialog = (dialogName) => {
    setOpenDialog({ ...openDialog, [dialogName]: false });
  };

  const handleOpenDialog = (dialogName) =>
    setOpenDialog({ ...openDialog, [dialogName]: true });

  const handleAgreeToPay = () => {
    if (selectedPaymentMethod) {
      const { bankCode, bankNumber } = selectedBank || {};
      createOrder(
        isBankTransfer ? bankNumber : bankCode,
        `${CRM_URL}${ROUTES.PAYMENT}`,
      );
      setActiveStep(PAYMENT_STEP.COMPLETED);
    } else handleOpenDialog(DIALOG_NAMES.NOT_SELECTED_BANK);
  };

  const handleSelectBank = (bank) => setSelectedBank(bank);

  const handleSelectPaymentMethod = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setIsBankTransfer(
      paymentMethod && paymentMethod.type === PAYMENT_METHOD_TYPE.BANK,
    );
  };

  const handleConfirmTransferOrder = async () => {
    if (latestOrder.status !== ORDER_STATUS.PENDING) return;
    const data = await apis.orders.confirmByCustomer(latestOrder.id);
    if (data?.status) {
      handleOpenDialog(DIALOG_NAMES.CONFIRM_TRANSACTION);
      dispatch(
        actions.user.getLatestOrderSuccess({
          ...latestOrder,
          isConfirmedByCustomer: true,
        }),
      );
      return;
    }
    dispatch(actions.noti.push({ severity: 'error', message: data?.message }));
  };

  const handleConfirmDowngradePackage = () => {
    setDowngradePackage(true);
    handleCloseDialog(DIALOG_NAMES.DOWNGRADE_PACKAGE);
  };

  const handleCancelPendingOrder = async () => {
    if (latestOrder.status !== ORDER_STATUS.PENDING) return;

    setLoading({ ...loading, cancelOrder: true });
    const data = await apis.orders.cancelOrder(latestOrder.id);
    setLoading({ ...loading, cancelOrder: false });
    if (!data.status) {
      if (data.code === ERROR_CODE.UNCANCELED_ORDER)
        handleCloseDialog(DIALOG_NAMES.PENDING_ORDER);
      dispatch(actions.noti.push({ severity: 'error', code: data.code }));
      return;
    }
    dispatch(actions.user.getLatestOrderSuccess(data.result));
    handleComeBackToPackage();
  };

  const handleContinuePayingDialog = () => {
    if (latestOrder.status !== ORDER_STATUS.PENDING) return;

    if (latestOrder.paymentLink)
      window.location.assign(latestOrder.paymentLink);
    handleCloseDialog(DIALOG_NAMES.PENDING_ORDER);
  };

  const handleToggleInvoiceDialog = (checkedInvoice) => {
    setOpenDialog({
      [DIALOG_NAMES.CONFIRM_TRANSACTION]: !checkedInvoice,
      [DIALOG_NAMES.GET_INVOICE]: checkedInvoice,
    });
  };

  const handleCreateInvoice = async (invoice) => {
    const data = await apis.orders.createInvoice(latestOrder.id, invoice);
    if (data.status) {
      dispatch(
        actions.noti.push({
          severity: 'success',
          message: 'createInvoiceSuccessfully',
        }),
      );
      handleComeBackToPackage();
      return;
    }
    dispatch(
      actions.noti.push({
        severity: 'error',
        code: data?.code,
        message: data?.message || 'createInvoiceError',
      }),
    );
  };

  const fetchPackages = async (packageCode) => {
    const data = await apis.packages.getPackages({});
    if (data?.status) {
      const currentPackage = data.result.packages.find(
        (item) => item.code === packageCode,
      );
      const openDowngradePackageDialog =
        usingPackage &&
        usingPackage.rank > currentPackage.rank &&
        latestOrder.status !== ORDER_STATUS.PENDING;
      if (openDowngradePackageDialog)
        handleOpenDialog(DIALOG_NAMES.DOWNGRADE_PACKAGE);
      setCurrPackage(currentPackage);
    }
  };

  const fetchOrderState = async (token) => {
    const data = await apis.orders.getOrderState(token);
    if (data.status) {
      switch (data.result.state) {
        case ORDER_STATE.SUCCESS:
          handleOpenDialog(DIALOG_NAMES.CONFIRM_TRANSACTION);
          setHasPaid(true);
          setActiveStep(PAYMENT_STEP.COMPLETED);
          setIsBankTransfer(false);
          break;
        case ORDER_STATE.FAILED:
          // TODO: handle Failed Dialog
          break;
        case ORDER_STATE.PROCESSING:
          // TODO: handle processing dialog
          break;
        default:
          break;
      }
    }
  };

  const fetchOrder = async (orderId) => {
    const data = await apis.orders.getOrderById(orderId);
    if (data.status) {
      setCurrPackage(data.result.package);
      setSelectedPaymentMethod(data.result.paymentMethod);
    }
  };

  useEffect(() => {
    const {
      token,
      orderId,
      package: packageCode,
    } = camelcaseKeys(queryString.parse(location.search) || {});

    if (token && orderId) {
      fetchOrderState(token);
      fetchOrder(orderId);
    }
    if (packageCode) {
      fetchPackages(packageCode);
    }
  }, [location]);

  useEffect(() => {
    if (latestOrder.status === ORDER_STATUS.PENDING) {
      history.replace({ search: `?package=${latestOrder.package?.code}` });
      setCurrPackage(latestOrder.package);
      setSelectedPaymentMethod(latestOrder.paymentMethod);
      setActiveStep(PAYMENT_STEP.COMPLETED);
      setIsBankTransfer(
        latestOrder.paymentMethod?.type === PAYMENT_METHOD_TYPE.BANK,
      );
      if (!latestOrder.isConfirmedByCustomer)
        handleOpenDialog(DIALOG_NAMES.PENDING_ORDER);
    }
  }, [latestOrder]);

  useEffect(() => {
    if (isTransferOrder && latestOrder.status === ORDER_STATUS.PENDING)
      handleCloseDialog(DIALOG_NAMES.PENDING_ORDER);
  }, [isTransferOrder, latestOrder]);

  return (
    <Card padding="16px 0px">
      <StyledPaymentWrapper>
        <ComeBack
          title={t('backToPackage')}
          sx={{
            position: 'absolute',
            top: { md: '20px', xs: '60px' },
            left: '25px',
          }}
          onClick={handleComeBackToPackage}
        />
        <StyledStepper
          activeStep={activeStep}
          alternativeLabel
          connector={<StyledStepConnector />}
          sx={{ width: { xs: '450px', sm: '600px' } }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                className={classNames('label-above', {
                  active: index === activeStep,
                  completed: index < activeStep,
                })}
                StepIconComponent={CustomStepIcon}
              >
                {t(label)}
              </StepLabel>
            </Step>
          ))}
        </StyledStepper>
        <Grid container spacing={3} className="content-wrapper">
          <Grid item xs={12} sm={7} md={8} className="column">
            <PaymentBox
              hasPaid={hasPaid}
              activeStep={activeStep}
              selectedBank={selectedBank}
              selectedPaymentMethod={selectedPaymentMethod}
              loadingTransfer={loading.transfer}
              isBankTransfer={isBankTransfer}
              onSelectBank={handleSelectBank}
              onSelectPaymentMethod={handleSelectPaymentMethod}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={4} className="column right">
            {/* <PromotionBox /> */}
            <OrderBox
              currPackage={currPackage}
              isBankTransfer={isBankTransfer}
              activeStep={activeStep}
              hasPaid={hasPaid}
              onAgreeToPay={handleAgreeToPay}
              onConfirmTransferOrder={handleConfirmTransferOrder}
            />
          </Grid>
        </Grid>
      </StyledPaymentWrapper>
      <PaymentNotificationDialogs
        DIALOG_NAMES={DIALOG_NAMES}
        openDialog={openDialog}
        loading={loading}
        onCloseDialog={handleCloseDialog}
        onComeBackToPackage={handleComeBackToPackage}
        onConfirmDowngradePackage={handleConfirmDowngradePackage}
        onCancelPendingOrder={handleCancelPendingOrder}
        onContinuePayingDialog={handleContinuePayingDialog}
        onCreateInvoice={handleCreateInvoice}
        onToggleInvoiceDialog={handleToggleInvoiceDialog}
      />
    </Card>
  );
};

export default Payment;
