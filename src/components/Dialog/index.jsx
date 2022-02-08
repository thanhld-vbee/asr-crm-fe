import React from 'react';
import { DialogTitle, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { StyledDialog } from './index.style';

const Dialog = ({
  title,
  subTitle,
  open,
  width,
  maxWidth,
  children,
  onClose,
}) => (
  <StyledDialog
    fullWidth
    width={width}
    maxWidth={maxWidth}
    open={open}
    onClose={onClose}
  >
    <DialogTitle classes={{ root: 'dialog-title' }}>
      {title}
      <IconButton
        aria-label="close"
        onClick={onClose}
        color="secondary"
        className="close-button"
      >
        <Close color="secondary" />
      </IconButton>
      {subTitle && (
        <Typography className="sub-title" variant="body2">
          {subTitle}
        </Typography>
      )}
    </DialogTitle>
    {children}
  </StyledDialog>
);

export default Dialog;
