import React from 'react';
import {
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import infoIcon from '@src/assets/icons/info.png';
import warningIcon from '@src/assets/icons/warning.png';

import { StyledDialog } from './index.style';

const NotificationDialog = ({
  name,
  title,
  description,
  variant = 'info', // info | warning
  open,
  width,
  contentComponent,
  actionComponent,
  onClose,
}) => {
  const renderIcon = () => {
    switch (variant) {
      case 'info':
        return infoIcon;
      case 'warning':
        return warningIcon;
      default:
        return null;
    }
  };

  const handleClose = () => onClose(name);

  return (
    <StyledDialog
      key={name}
      open={open}
      width={width}
      onClose={handleClose}
      fullWidth
    >
      <div className="dialog-wrapper">
        <div>
          <img src={renderIcon()} alt="icon" />
        </div>
        <div className="content-wrapper">
          <DialogTitle classes={{ root: 'dialog-title' }}>
            <Typography className="title">{title}</Typography>
            <div
              className="description"
              // TODO: fix dangerouslySetInnerHTML
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </DialogTitle>
          <DialogContent classes={{ root: 'dialog-content' }}>
            {contentComponent}
          </DialogContent>
          {actionComponent && <DialogActions>{actionComponent}</DialogActions>}
        </div>
      </div>
    </StyledDialog>
  );
};

export default NotificationDialog;
