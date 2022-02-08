import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { ExitToApp, Upload } from '@mui/icons-material';

import { checkFeaturePermission } from '@src/services/tts';
import { FEATURE } from '@src/constants/package';

import UploadFile from './UploadFile';
import { StyledImportToolbar } from './index.style';
import ImportURL from './ImportURL';

const ImportToolbar = ({ onHandleUploadContent }) => {
  const [openUpload, setOpenUpload] = useState(false);
  const [openImportUrl, setOpenImportUrl] = useState(false);
  const { t } = useTranslation();

  const { usingPackage } = useSelector((state) => state.user);

  const hasTtsByFile =
    usingPackage.id &&
    checkFeaturePermission(usingPackage.features, FEATURE.TTS_BY_FILE);

  const hasTtsByUrl =
    usingPackage.id &&
    checkFeaturePermission(usingPackage.features, FEATURE.TTS_BY_URL);

  const handleOpenUpload = () => setOpenUpload(true);
  const handleCloseUpload = () => setOpenUpload(false);

  const handleOpenImportUrl = () => setOpenImportUrl(true);
  const handleCloseImportUrl = () => setOpenImportUrl(false);

  return (
    <StyledImportToolbar>
      <div className="upload">
        <Button
          variant="outlined"
          component="span"
          className="upload-button"
          startIcon={<Upload />}
          color="secondary"
          onClick={handleOpenUpload}
          disabled={!hasTtsByFile}
        >
          {t('uploadTextFile')}
        </Button>
      </div>
      <div className="paste">
        <Button
          variant="outlined"
          component="span"
          className="upload-button"
          color="secondary"
          startIcon={<ExitToApp />}
          onClick={handleOpenImportUrl}
          disabled={!hasTtsByUrl}
        >
          {t('handleByUrl')}
        </Button>
      </div>
      <UploadFile
        open={openUpload}
        onClose={handleCloseUpload}
        onHandleUploadContent={onHandleUploadContent}
      />
      <ImportURL
        open={openImportUrl}
        onClose={handleCloseImportUrl}
        onHandleUploadContent={onHandleUploadContent}
      />
    </StyledImportToolbar>
  );
};

export default ImportToolbar;
