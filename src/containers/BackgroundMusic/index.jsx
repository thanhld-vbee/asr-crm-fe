import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import actions from '@src/redux/actions';
import { PAGINATION_LIMIT } from '@src/constants';
import { AUDIO_FILE_FORMAT } from '@src/constants/voice';
import apis from '@src/apis';
import { isValidFile } from '@src/utils/checkValid';

import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
  List,
} from '@mui/material';
import Dialog from '@src/components/Dialog';

import CustomPagination from '@src/components/Pagination';
import ProcessHandler from '@src/components/ProcessHandler';
import BackgroundMusicItem from './BackgroundMusicItem';
import { StyledMusic } from './index.style';

const BackgroundMusic = ({
  open,
  currentBackgroundMusic,
  onChange,
  onClose,
}) => {
  const [bgMusics, setBgMusics] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingMusic, setLoadingMusic] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState();

  const [presignedUrl, setPreSignedUrl] = useState(null);
  const [preUrlLoading, setPreUrlLoading] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [uploadError, setUploadError] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getUploadPresignedUrl = async (extension) => {
    setPreUrlLoading(true);
    const data = await apis.upload.getUploadPresignedUrl(extension);
    setPreUrlLoading(false);
    if (data && data.status) setPreSignedUrl(data.result.url);
  };

  const fetchBackgroundMusics = async () => {
    setLoadingMusic(true);
    const data = await apis.voices.getBackgroundMusics();
    setLoadingMusic(false);
    if (data && data.status) {
      const { backgroundMusics, metadata } = data.result;
      setTotal(metadata.total);
      setBgMusics(backgroundMusics);
      const bgMusicIndex = backgroundMusics.findIndex(
        (item) =>
          item.link === currentBackgroundMusic.link &&
          item.name === currentBackgroundMusic.name,
      );
      if (bgMusicIndex >= 0) {
        const newPage = Math.ceil((bgMusicIndex + 1) / PAGINATION_LIMIT);
        setPage(newPage);
      }
    }
  };

  const createBackgroundMusic = async (name, link) => {
    const data = await apis.voices.createBackgroundMusic(name, link);
    setLoadingUpload(false);
    if (!data && !data?.status) {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'uploadMusicFailure',
        }),
      );
    }
    const newBgMusic = data.result.result;
    const newBgMusics = [newBgMusic, ...bgMusics];
    setSelectedMusic(newBgMusic);
    setBgMusics(newBgMusics);
    dispatch(
      actions.noti.push({
        severity: 'success',
        message: 'uploadMusicSuccessfully',
      }),
    );
  };

  const handleChangePage = (value) => setPage(value);

  const handleSelectedMusic = (music) => setSelectedMusic(music);

  const handleRejectUpload = () => {
    setPage(1);
    setLoadingMusic(false);
    setSelectedMusic();
    setPreSignedUrl();
    setPreUrlLoading(false);
    setFile();
    setFileName();
    setUploadError(false);
  };

  const handleClose = () => {
    handleRejectUpload();
    onClose();
  };

  const handleChangeFile = (e) => {
    const { files } = e.target;
    if (!files || files.length !== 1) return;

    const { name } = files[0];
    if (!isValidFile(name, AUDIO_FILE_FORMAT)) {
      setUploadError(true);
      return;
    }
    setFileName(name);
    const extension = name.split('.').pop();
    getUploadPresignedUrl(extension);
    setFile(e.target.files[0]);
  };

  const handleUploadFile = async () => {
    if (!presignedUrl || !file) {
      return;
    }
    const { pathname, origin } = new URL(presignedUrl);
    const key = pathname.split('/')[1];

    setLoadingUpload(true);
    const data = await apis.upload.uploadByPresignedUrl(presignedUrl, file);
    if (data.status === 200) {
      const link = `${origin}/${key}`;
      await createBackgroundMusic(fileName, link);
      handleRejectUpload();
    }
  };

  const handleApplyBackgroundMusic = () => {
    const name = selectedMusic?.name;
    const link = selectedMusic?.link;
    onChange(name, link);
    handleClose();
  };

  useEffect(() => {
    if (open) {
      fetchBackgroundMusics();
      dispatch(actions.audioPlayer.updateStatus(false));
    }
  }, [open]);

  useEffect(() => {
    if (currentBackgroundMusic) setSelectedMusic(currentBackgroundMusic);
  }, [currentBackgroundMusic, open]);

  const UploadError = () => (
    <div className="upload-wrapper">
      <Typography variant="subtitle2" color="error">
        {`${t('onlyUpload')} ${AUDIO_FILE_FORMAT}`}
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        className="reject-button"
        onClick={handleRejectUpload}
      >
        {t('reuploadBackgroundMusic')}
      </Button>
    </div>
  );

  const UploadFile = () => (
    <div className="upload-wrapper">
      <Typography variant="body1" className="upload-filename">
        {`${t('uploaded')} ${file.name}`}
      </Typography>
      <ProcessHandler loading={loadingUpload} mr="12px" size={25}>
        <Button
          variant="contained"
          color="primary"
          className="upload-button"
          onClick={handleUploadFile}
        >
          {t('upload')}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className="reject-button"
          onClick={handleRejectUpload}
        >
          {t('cancel')}
        </Button>
      </ProcessHandler>
    </div>
  );

  return (
    <Dialog
      title={t('backgroundMusic')}
      open={open}
      fullWidth
      onClose={handleClose}
    >
      <StyledMusic>
        <DialogContent>
          <ProcessHandler loading={preUrlLoading} size={23} align="center">
            {!file && !uploadError && (
              <label htmlFor="upload-music-file">
                <input
                  id="upload-music-file"
                  className="file-input"
                  type="file"
                  accept=".mp3,.wav"
                  onChange={handleChangeFile}
                />
                <Typography variant="subtitle2" className="upload-music-button">
                  {t('uploadMusic')}
                </Typography>
              </label>
            )}
            {uploadError && <UploadError />}
            {file && presignedUrl && <UploadFile />}
          </ProcessHandler>
          <ProcessHandler loading={loadingMusic} align="center">
            <List className="music-list">
              {bgMusics &&
                bgMusics
                  .slice(
                    page * PAGINATION_LIMIT - PAGINATION_LIMIT,
                    page * PAGINATION_LIMIT,
                  )
                  .map((musicItem) => {
                    const isSelected =
                      selectedMusic &&
                      selectedMusic.link === musicItem.link &&
                      selectedMusic.name === musicItem.name;
                    return (
                      <BackgroundMusicItem
                        key={musicItem.id}
                        backgroundMusic={musicItem}
                        isSelected={isSelected}
                        onSelectedMusic={handleSelectedMusic}
                      />
                    );
                  })}
            </List>
            {total > PAGINATION_LIMIT && (
              <CustomPagination
                totalPages={Math.ceil(total / PAGINATION_LIMIT)}
                page={page}
                onChangePage={handleChangePage}
              />
            )}
          </ProcessHandler>
        </DialogContent>
        <DialogActions classes={{ root: 'dialog-action' }}>
          <Button
            variant="contained"
            color="primary"
            className="apply-button"
            onClick={handleApplyBackgroundMusic}
          >
            {t('apply')}
          </Button>
        </DialogActions>
      </StyledMusic>
    </Dialog>
  );
};

export default BackgroundMusic;
