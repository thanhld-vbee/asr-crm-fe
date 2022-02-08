import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box, Typography } from '@mui/material';
import NotificationDialog from '@src/components/NotificationDialog';
import ProcessHandler from '@src/components/ProcessHandler';
import CustomSwitch from '@src/components/Switch';
import Feature from '@src/components/Feature';
import { validateEmail } from '@src/utils/checkValid';
import FEATURE_FLAG from '@src/constants/featureFlags.json';

import { StyledCompletedAction } from './index.style';
import Invoice from './Invoice';

const initialInvoice = {
  companyName: '',
  companyAddress: '',
  companyTax: '',
  companyEmail: '',
};

const PaymentNotificationDialogs = ({
  openDialog,
  loading,
  DIALOG_NAMES,
  onCloseDialog,
  onComeBackToPackage,
  onConfirmDowngradePackage,
  onCancelPendingOrder,
  onContinuePayingDialog,
  onCreateInvoice,
  onToggleInvoiceDialog,
}) => {
  const { t } = useTranslation();
  const [checkedInvoice, setCheckedInvoice] = useState(false);
  const [invoice, setInvoice] = useState(initialInvoice);
  const [invoiceError, setInvoiceError] = useState({});

  const handleCloseDialog = (dialogName) => onCloseDialog(dialogName);

  const activeDialogName = Object.keys(openDialog).find(
    (key) => openDialog[key],
  );

  const verifyInvoice = () => {
    const { companyName, companyAddress, companyTax, companyEmail } = invoice;
    const errors = {};

    if (!companyName) errors.companyName = 'companyNameRequired';
    if (!companyAddress) errors.companyAddress = 'companyAddressRequired';
    if (!companyTax) errors.companyTax = 'companyTaxRequired';
    if (companyEmail && !validateEmail(companyEmail))
      errors.companyEmail = 'emailInvalid';

    return errors;
  };

  const handleCompletedTransaction = () => {
    const errors = verifyInvoice();

    if (Object.keys(errors).length) {
      setInvoiceError(errors);
      return;
    }
    onCreateInvoice(invoice);
  };

  const handleChangeCheckedInvoice = () => {
    onToggleInvoiceDialog(!checkedInvoice);
    setCheckedInvoice((prev) => !prev);
  };

  const handleChangeInvoice = (name, value) => {
    setInvoiceError({ ...invoiceError, [name]: null });
    setInvoice({ ...invoice, [name]: value });
  };

  const renderActionComponent = () => {
    switch (activeDialogName) {
      case DIALOG_NAMES.NOT_SELECTED_BANK:
        return (
          <Button
            variant="contained"
            onClick={() => handleCloseDialog(activeDialogName)}
          >
            {t('understood')}
          </Button>
        );
      case DIALOG_NAMES.CONFIRM_TRANSACTION:
        return (
          <StyledCompletedAction>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Feature name={FEATURE_FLAG.INVOICE}>
                <>
                  <CustomSwitch
                    checked={checkedInvoice}
                    onChange={handleChangeCheckedInvoice}
                  />
                  <Typography>{t('invoice')}</Typography>
                </>
              </Feature>
            </Box>

            <Button variant="contained" onClick={onComeBackToPackage}>
              {t('completed')}
            </Button>
          </StyledCompletedAction>
        );
      case DIALOG_NAMES.PENDING_ORDER:
        return (
          <>
            <Button variant="outlined" onClick={onCancelPendingOrder}>
              <ProcessHandler loading={loading.cancelOrder} size={25}>
                {t('cancelOrder')}
              </ProcessHandler>
            </Button>
            <Button variant="contained" onClick={onContinuePayingDialog}>
              {t('continue')}
            </Button>
          </>
        );
      case DIALOG_NAMES.DOWNGRADE_PACKAGE:
        return (
          <>
            <Button variant="outlined" onClick={onComeBackToPackage}>
              {t('chooseAnotherPackage')}
            </Button>
            <Button variant="contained" onClick={onConfirmDowngradePackage}>
              {t('continue')}
            </Button>
          </>
        );
      case DIALOG_NAMES.GET_INVOICE:
        return (
          <StyledCompletedAction>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <CustomSwitch
                checked={checkedInvoice}
                onChange={handleChangeCheckedInvoice}
              />
              <Typography>{t('invoice')}</Typography>
            </Box>
            <Button variant="contained" onClick={handleCompletedTransaction}>
              {t('completed')}
            </Button>
          </StyledCompletedAction>
        );
      default:
        return '';
    }
  };

  const dialogList = [
    {
      name: DIALOG_NAMES.NOT_SELECTED_BANK,
      title: t('haveNotSelectedBankTitle'),
      description: t('haveNotSelectedBankDescription'),
      variant: 'warning',
      onClose: handleCloseDialog,
    },
    {
      name: DIALOG_NAMES.CONFIRM_TRANSACTION,
      title: t('confirmedTransactionTitle'),
      description: t('confirmedTransactionDescription'),
      variant: 'info',
      onClose: handleCloseDialog,
    },
    {
      name: DIALOG_NAMES.PENDING_ORDER,
      title: t('havePendingOrderTitle'),
      description: t('havePendingOrderDescription'),
      variant: 'warning',
      onClose: handleCloseDialog,
    },
    {
      name: DIALOG_NAMES.DOWNGRADE_PACKAGE,
      title: t('warningSelectSmallerPackageTitle'),
      description: t('warningSelectSmallerPackageDescription'),
      variant: 'warning',
      onClose: () => ({}),
    },
    {
      name: DIALOG_NAMES.GET_INVOICE,
      title: t('confirmedTransactionTitle'),
      description: t('getInvoiceDescription'),
      variant: 'info',
      onClose: handleCloseDialog,
      contentComponent: (
        <Invoice
          invoice={invoice}
          error={invoiceError}
          onChange={handleChangeInvoice}
        />
      ),
    },
  ];

  const activeDialog = dialogList.find(
    (dialog) => dialog.name === activeDialogName,
  );

  if (!activeDialog) return '';

  return (
    <NotificationDialog
      name={activeDialog.name}
      title={activeDialog.title}
      description={activeDialog.description}
      variant={activeDialog.variant}
      open={openDialog[activeDialog.name]}
      onClose={activeDialog.onClose}
      actionComponent={renderActionComponent()}
      contentComponent={activeDialog.contentComponent}
    />
  );
};

export default PaymentNotificationDialogs;
