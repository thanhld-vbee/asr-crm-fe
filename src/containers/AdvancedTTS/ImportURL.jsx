import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, TextField, DialogActions, Button } from '@mui/material';
import ProcessHandler from '@src/components/ProcessHandler';
import Dialog from '@src/components/Dialog';
import apis from '@src/apis';
import { isValidHttpUrl } from '@src/utils/checkValid';
import { StyledHandleByUrl } from './index.style';

const ImportURL = ({ open, onClose, onHandleUploadContent }) => {
  const [link, setLink] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e) => {
    setError(false);
    setLink(e.target.value);
  };

  const handleClose = () => {
    onClose();
    setError(false);
    setLink('');
    setLoading(false);
  };

  const handleCrawNewsByUrl = async () => {
    if (!link || !isValidHttpUrl(link)) {
      setError(true);
      return;
    }
    setLoading(true);
    const data = await apis.upload.crawlNewsByUrl(link);
    setLoading(false);
    if (data && data.status) {
      onHandleUploadContent(data.results.text);
      handleClose();
    } else {
      setError(true);
    }
  };

  return (
    <Dialog
      title={t('handleByUrl')}
      subTitle={t('pasteContentUrlHere')}
      open={open}
      fullWidth
      onClose={handleClose}
    >
      <StyledHandleByUrl>
        <DialogContent className="handle-url-content">
          <TextField
            error={error}
            helperText={error && t('errorHandleByUrl')}
            fullWidth
            color="secondary"
            classes={{ input: 'paste-input' }}
            placeholder={t('exampleValidUrl')}
            value={link}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions className="actions">
          <ProcessHandler loading={loading} align="center" size={30}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCrawNewsByUrl}
              disabled={error}
            >
              {t('handleNow')}
            </Button>
          </ProcessHandler>
        </DialogActions>
      </StyledHandleByUrl>
    </Dialog>
  );
};

export default ImportURL;
