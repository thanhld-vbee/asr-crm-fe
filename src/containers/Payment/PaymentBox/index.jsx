import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import sanitizeHtml from 'sanitize-html';
import ProcessHandler from '@src/components/ProcessHandler';
import { PAYMENT_METHOD_TYPE, PAYMENT_STEP } from '@src/constants/payment';
import apis from '@src/apis';
import { ORDER_STATUS } from '@src/constants/order';
import CopyableButton from '@src/components/CopyableButton';

import BankItem from './BankItem';
import CommonBox from '../CommonBox';
import { StyledBankList, StyledTransferInformation } from './index.style';
import PaymentMethodItem from './PaymentMethodItem';

const PaymentBox = ({
  hasPaid,
  activeStep,
  selectedBank,
  selectedPaymentMethod,
  loadingTransfer,
  isBankTransfer,
  onSelectBank,
  onSelectPaymentMethod,
}) => {
  const { t } = useTranslation();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState({ paymentMethod: false, bank: false });

  const { latestOrder } = useSelector((state) => state.user);

  const handleSelectBank = (bankName) => {
    const bank = banks.find((item) => item.name === bankName);
    onSelectBank(bank);
  };

  const fetchBanks = async (getBankApi) => {
    setLoading({ ...loading, bank: true });
    const data = await getBankApi();
    setLoading({ ...loading, bank: false });
    if (data.status) {
      setBanks(data.result);
      onSelectBank(data.result[0] || null);
    }
  };

  const setDefaultPaymentMethods = (paymentMethodList) => {
    const paymentMethod = paymentMethodList.find(
      (item) => item.type === PAYMENT_METHOD_TYPE.BANK,
    );
    onSelectPaymentMethod(paymentMethod);
    fetchBanks(apis.banks.getTransferBanks);
  };

  const fetchPaymentMethods = async () => {
    setLoading({ ...loading, paymentMethod: true });
    const data = await apis.paymentMethods.getPaymentMethods();
    setLoading({ ...loading, paymentMethod: false });
    if (data.status) {
      const { result } = data;
      const displayPaymentMethods = result.paymentMethods.filter(
        (method) =>
          method.active &&
          method.type !== PAYMENT_METHOD_TYPE.APPLE &&
          method.type !== PAYMENT_METHOD_TYPE.GOOGLE,
      );
      setPaymentMethods(displayPaymentMethods);
      if (!hasPaid) setDefaultPaymentMethods(result.paymentMethods);
    }
  };

  const handleSelectPaymentMethod = (paymentMethodId, paymentMethodType) => {
    if (hasPaid) return;
    if (paymentMethodType === PAYMENT_METHOD_TYPE.BANK)
      fetchBanks(apis.banks.getTransferBanks);
    if (paymentMethodType === PAYMENT_METHOD_TYPE.ATM)
      fetchBanks(apis.banks.getBanks);

    const paymentMethod = paymentMethods.find(
      (item) => item.id === paymentMethodId,
    );
    onSelectPaymentMethod(paymentMethod);
  };

  useEffect(() => {
    if (!latestOrder.status) return;
    if (latestOrder.status === ORDER_STATUS.PENDING) {
      onSelectBank(latestOrder.bank);
    } else fetchPaymentMethods();
  }, [latestOrder, hasPaid]);

  const renderPaymentMethodBody = (paymentMethodType) => {
    if (
      paymentMethodType === PAYMENT_METHOD_TYPE.BANK ||
      (paymentMethodType === PAYMENT_METHOD_TYPE.ATM && !hasPaid)
    )
      return (
        <ProcessHandler loading={loading.bank} mt="10px" ml="10px" size={25}>
          <StyledBankList>
            {banks &&
              banks.map((bank) => (
                <BankItem
                  onSelect={handleSelectBank}
                  bank={bank}
                  selected={selectedBank && selectedBank.name === bank.name}
                />
              ))}
          </StyledBankList>
        </ProcessHandler>
      );
    return '';
  };

  const renderTransferInformation = () => (
    <ProcessHandler loading={loadingTransfer} mt="20px" ml="10px" size={25}>
      {isBankTransfer && selectedBank && (
        <PaymentMethodItem
          paymentMethod={selectedPaymentMethod}
          selected
          darkRadio
        >
          <StyledTransferInformation>
            <div className="content-wrapper">
              <BankItem
                onSelect={handleSelectBank}
                bank={selectedBank}
                selected
              />
              <div className="content-information">
                <Typography className="label">{t('bank')}:</Typography>
                <Typography className="value">
                  {selectedBank?.address}
                </Typography>
                <Typography className="label">{t('accountOwner')}:</Typography>
                <Typography className="value">
                  {selectedBank?.holder}
                </Typography>
                <Typography className="label">{t('cardNumber')}:</Typography>
                <Typography className="value card-number">
                  <b>{selectedBank?.bankNumber || selectedBank?.number}</b>
                  <CopyableButton
                    content={selectedBank?.bankNumber || selectedBank?.number}
                  />
                </Typography>
                <Typography className="label">
                  {t('transferContent')}:
                </Typography>
                <Typography className="value">{latestOrder.code}</Typography>
              </div>
            </div>
            <div className="note">
              <Typography className="note">{t('note')}:</Typography>
              <div
                // TODO: fix dangerouslySetInnerHTML
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(t('transferInformationNoteContent')),
                }}
              />
            </div>
          </StyledTransferInformation>
        </PaymentMethodItem>
      )}
    </ProcessHandler>
  );

  const renderRedirectProcessing = () => (
    <ProcessHandler loading={loadingTransfer} mt="20px" ml="10px" size={25} />
  );

  const isPaymentStep = activeStep === PAYMENT_STEP.PAYMENT;
  const isRenderedBankTransfer =
    isBankTransfer &&
    latestOrder.status === ORDER_STATUS.PENDING &&
    !latestOrder.paymentLink;

  const renderTitle = () => {
    if (isPaymentStep) return t('choosePaymentMethod');
    if (latestOrder.status === ORDER_STATUS.PENDING && latestOrder.paymentLink)
      return '';
    if (isBankTransfer) return t('transferInformation');
    if (loadingTransfer) return t('processing');
    if (hasPaid) return t('successfulPayment');
    return t('redirecting');
  };

  return (
    <CommonBox title={renderTitle()} bordered={isPaymentStep || hasPaid}>
      {(isPaymentStep || hasPaid) && <Box height={12} />}
      {(isPaymentStep || hasPaid) && (
        <ProcessHandler
          loading={loading.paymentMethod}
          mt="20px"
          ml="10px"
          size={25}
        >
          {paymentMethods?.length &&
            paymentMethods
              .sort((a, b) => a.rank - b.rank)
              .map((paymentMethod) => {
                const selected =
                  selectedPaymentMethod &&
                  selectedPaymentMethod.id === paymentMethod.id;
                return (
                  paymentMethod.active && (
                    <PaymentMethodItem
                      paymentMethod={paymentMethod}
                      selected={selected}
                      onCheck={handleSelectPaymentMethod}
                    >
                      {selected && renderPaymentMethodBody(paymentMethod.type)}
                    </PaymentMethodItem>
                  )
                );
              })}
        </ProcessHandler>
      )}
      {activeStep === PAYMENT_STEP.COMPLETED &&
      selectedPaymentMethod &&
      isRenderedBankTransfer
        ? renderTransferInformation()
        : renderRedirectProcessing()}
    </CommonBox>
  );
};

export default PaymentBox;
