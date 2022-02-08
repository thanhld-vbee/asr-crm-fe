import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
  Divider,
} from '@mui/material';
import { StyledConfirmUseOldVersion, StyledInfoUser } from './index.style';

const ConfirmUseOldVersion = ({ open, user, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <StyledConfirmUseOldVersion
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle classes={{ root: 'dialog-title' }}>
        {t('switchOldVersion')}
        <div className="sub-title-wrapper">
          <Typography className="sub-title" variant="body2">
            {t('noteSwitchOldVersion')}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent>
        <StyledInfoUser>
          <div className="information-column">
            <Typography>{t('userName')}:</Typography>
            <Typography className="content">
              {`${user?.lastName} ${user?.firstName}`}
            </Typography>
            <Typography>{t('phoneNumber')}:</Typography>
            <Typography className="content">
              {user?.phoneNumber || t('noData')}
            </Typography>
            <Typography>{t('email')}:</Typography>
            <Typography className="content">
              {user?.email || t('noData')}
            </Typography>
          </div>
          <Divider orientation="vertical" flexItem className="divider" />
          <div className="information-column">
            <Typography>{t('package')}:</Typography>
            <Typography className="content">{user?.packageCode}</Typography>
            <Typography>{t('remainingCharacters')}:</Typography>
            <Typography className="content">
              {user?.remainingCharacters}
            </Typography>
            <Typography>{t('freeCharacters')}:</Typography>
            <Typography className="content">{user?.bonusCharacters}</Typography>
            <Typography>{t('reservedCharacters')}:</Typography>
            <Typography className="content">{user?.lockCharacters}</Typography>
            <Typography>{t('expiryDate')}:</Typography>
            <Typography className="content">
              {(user.packageExpiryDate &&
                moment(user.packageExpiryDate).format('DD/MM/YYYY')) ||
                (!user.packageExpiryDate && user.packageCode && t('endless'))}
            </Typography>
          </div>
        </StyledInfoUser>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          {t('convert')}
        </Button>
      </DialogActions>
    </StyledConfirmUseOldVersion>
  );
};

export default ConfirmUseOldVersion;
