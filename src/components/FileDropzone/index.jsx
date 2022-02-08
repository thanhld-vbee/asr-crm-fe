import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Typography, Button } from '@mui/material';
import { isValidFile } from '@src/utils/checkValid';
import { StyledFileDropzone } from './index.style';

const MEGA_BYTE = 15 * 1024 * 1024;

export default function FileDropzone({ fileType, onAddFile }) {
  const [file, setFile] = useState(null);
  const [hightlight, setHightlight] = useState(false);
  const [formatError, setFormatError] = useState(false);
  const [oversize, setOverSize] = useState(false);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();

  const isValidSize = (size) => size <= MEGA_BYTE;

  const handleReset = () => {
    setFile(null);
    setFormatError(false);
    setOverSize(false);
    setHightlight(false);
  };

  const handleChangeFile = (e) => {
    const { files } = e.target;
    handleReset();
    if (!files || files.length !== 1) return;
    if (!isValidFile(files[0].name, fileType)) {
      setFormatError(true);
      return;
    }
    if (!isValidSize(files[0].size)) {
      setOverSize(true);
      return;
    }
    setFile(files[0]);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setHightlight(true);
  };

  const onDragLeave = () => setHightlight(false);

  const onDrop = (e) => {
    e.preventDefault();
    handleReset();
    const { files } = e.dataTransfer;
    if (!files || files.length !== 1) return;
    if (!isValidFile(files[0].name, fileType)) {
      setFormatError(true);
      return;
    }
    if (!isValidSize(files[0].size)) {
      setOverSize(true);
      return;
    }
    setFile(files[0]);
  };

  const openFileDialog = () => fileInputRef.current.click();

  const handleAddSuccessFile = () => {
    onAddFile(file);
    handleReset();
  };

  const UploadSuccess = () => (
    <div
      className="upload-success"
      onClick={(e) => e.stopPropagation()}
      role="presentation"
    >
      <Typography variant="body1">{`${t('uploaded')} ${file.name}`}</Typography>
      <Button
        variant="contained"
        color="primary"
        className="done-button"
        onClick={handleAddSuccessFile}
      >
        {t('done')}
      </Button>
      <div className="other-case">
        <Typography variant="body1">{t('or')}:</Typography>
        <label htmlFor="contained-other-file">
          <input
            id="contained-other-file"
            className="file-input"
            type="file"
            onChange={handleChangeFile}
          />
          <Typography variant="body1" className="choose-other-file">
            {t('chooseOtherFile')}
          </Typography>
        </label>
      </div>
    </div>
  );

  const UploadError = () => (
    <>
      <Typography variant="body2" className="allow-format-file">
        {t('allowedFileFormats')}
      </Typography>
      {formatError && (
        <Typography variant="subtitle2" color="error">
          {`${t('onlyUpload')} ${fileType}`}
        </Typography>
      )}
      {oversize && (
        <Typography variant="subtitle2" color="error">
          {t('oversizeError')}
        </Typography>
      )}
    </>
  );

  const UploadNote = () => (
    <Typography variant="body2">{t('allowedFileFormats')}</Typography>
  );

  return (
    <StyledFileDropzone>
      <div
        className={classNames('dropzone', { hightlight })}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={openFileDialog}
        role="presentation"
      >
        <input
          ref={fileInputRef}
          className="file-input"
          type="file"
          onChange={handleChangeFile}
        />
        <Typography variant="h5" className="upload-file-title">
          {t('dropFileInstruct')}
        </Typography>
        {(() => {
          if (file === null) {
            if (formatError || oversize) return <UploadError />;
            return <UploadNote />;
          }
          return <UploadSuccess />;
        })()}
      </div>
    </StyledFileDropzone>
  );
}
