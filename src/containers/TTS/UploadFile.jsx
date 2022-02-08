import React from 'react';
import mammoth from 'mammoth';
import { useTranslation } from 'react-i18next';
import { DialogContent } from '@mui/material';
import Dialog from '@src/components/Dialog';
import FileDropzone from '@src/components/FileDropzone';
import { TEXT_FILE_FORMAT } from '@src/constants/voice';

const UploadFile = ({ open, onClose, onHandleUploadContent }) => {
  const { t } = useTranslation();

  const handleAddFile = (newFile) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const arrayBuffer = reader.result;
      const { value: uploadContent } = await mammoth.extractRawText({
        arrayBuffer,
      });
      onHandleUploadContent(uploadContent);
    };
    reader.readAsArrayBuffer(newFile);
    onClose();
  };

  return (
    <Dialog
      title={t('uploadYourTextFile')}
      open={open}
      maxWidth="md"
      fullWidth
      onClose={onClose}
    >
      <DialogContent>
        <FileDropzone fileType={TEXT_FILE_FORMAT} onAddFile={handleAddFile} />
      </DialogContent>
    </Dialog>
  );
};

export default UploadFile;
