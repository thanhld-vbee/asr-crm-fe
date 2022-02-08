import React, { useEffect, useState, createRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import api from '@src/apis';
import actions from '@src/redux/actions';
import { VOICE_PAGINATION_LIMIT } from '@src/constants/voice';

import {
  DialogActions,
  DialogContent,
  Typography,
  Pagination,
} from '@mui/material';
import Dialog from '@src/components/Dialog';
import ProcessHandler from '@src/components/ProcessHandler';
import { FilterAltOutlined } from '@mui/icons-material';

// import {  Shuffle } from '@mui/icons-material';

import VoiceItem from './VoiceItem';
import VoicesSort from './VoicesSort';
import VoicesFilter from './VoicesFilter';
import { StyledVoices } from './index.style';

const initialFilter = { gender: '', languageCode: '' };

const VoicesDialog = ({ open, activeVoiceId, onClose, onChangeVoice }) => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [voices, setVoices] = useState([]);
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(true);
  const [filter, setFilter] = useState(initialFilter);
  const [loading, setLoading] = useState(false);
  const [audioLink, setAudioLink] = useState('');

  const { t } = useTranslation();
  const audioRef = createRef(null);
  const dispatch = useDispatch();

  const handleChangeFilter = (value) => {
    setFilter(value);
    setPage(1);
  };
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleReset = () => handleChangeFilter(initialFilter);

  const fetchVoices = async () => {
    setLoading(true);
    const data = await api.voices.getVoices({
      ...filter,
      offset: (page - 1) * VOICE_PAGINATION_LIMIT,
      limit: VOICE_PAGINATION_LIMIT,
    });
    setLoading(false);
    if (data.result) {
      setVoices(data.result.voices);
      setTotal(data.result.metadata.total);
    }
  };

  // const handleOpenSort = (value) => {
  //   setOpenSort(!openSort);
  //   if (value) setOpenFilter(false);
  // };

  const handleOpenFilter = (value) => {
    setOpenFilter(value);
    if (value) setOpenSort(false);
  };

  const handleAudioEnd = () => {
    audioRef.current.pause();
    const newVoices = voices.map((item) =>
      item.playStatus ? { ...item, playStatus: false } : item,
    );
    setVoices(newVoices);
  };

  const handleClose = () => {
    setOpenFilter(true);
    setOpenSort(false);
    setFilter(initialFilter);
    setPage(1);
    setAudioLink('');
    handleAudioEnd();
    onClose();
  };

  const handleChangePlayAudio = (voice) => {
    dispatch(actions.audioPlayer.updateStatus(false));
    const audio = audioRef.current;
    if (!audioLink || voice.demo !== audioLink) {
      setAudioLink(voice.demo);
      audio.load();
    }

    if (voice.playStatus) {
      audio.pause();
    } else {
      audio.play();
    }

    const newVoices = voices.map((item) =>
      item.id === voice.id
        ? { ...voice, playStatus: !voice.playStatus }
        : { ...item, playStatus: false },
    );
    setVoices(newVoices);
  };

  const handleSelectedVoice = (voice) => {
    onChangeVoice(voice);
    handleClose();
  };

  useEffect(() => {
    fetchVoices();
  }, [page, filter]);

  return (
    <Dialog
      maxWidth="md"
      title={t('chooseVoice')}
      open={open}
      fullWidth
      onClose={handleClose}
    >
      <StyledVoices openSearch={openSort || openFilter}>
        <DialogActions classes={{ root: 'dialog-action' }}>
          <div className="button-wrapper">
            <div
              className={classNames('action-button', { active: openFilter })}
              onClick={() => handleOpenFilter(!openFilter)}
              role="presentation"
            >
              <Typography variant="body2"> {t('filter')} </Typography>
              <FilterAltOutlined className="action-icon" />
            </div>
            {/*  <div
            className={classNames('action-button', { active: openSort })}
            onClick={() => handleOpenSort(!openSort)}
            role="presentation"
          >
            <Typography variant="body2"> {t('sort')} </Typography>
            <Shuffle className="action-icon" />
          </div> */}
          </div>
          <Typography variant="body2" align="center">
            {t('chooseVoiceDescription')}
          </Typography>
        </DialogActions>
        <DialogContent className="content">
          <div className={classNames('voice-search', { active: openSort })}>
            <VoicesSort />
          </div>
          <div className={classNames('voice-search', { active: openFilter })}>
            <VoicesFilter
              filter={filter}
              onChangeFilter={handleChangeFilter}
              onHandleReset={handleReset}
            />
          </div>
          <div className="voice-content">
            <ProcessHandler loading={loading} mt="20px" ml="20px" size={50}>
              <div className="voice-list">
                {voices.map((voiceItem) => (
                  <VoiceItem
                    voice={voiceItem}
                    activeVoiceId={activeVoiceId}
                    key={voiceItem.id}
                    onChangePlayAudio={handleChangePlayAudio}
                    onSelectedVoice={handleSelectedVoice}
                  />
                ))}
              </div>
            </ProcessHandler>
            <div className="pagination">
              {total > VOICE_PAGINATION_LIMIT && !loading && (
                <Pagination
                  count={Math.ceil(total / VOICE_PAGINATION_LIMIT)}
                  page={page}
                  color="primary"
                  onChange={handleChangePage}
                />
              )}
            </div>
          </div>
        </DialogContent>
      </StyledVoices>
      <audio ref={audioRef} onEnded={handleAudioEnd}>
        <track kind="captions" />
        <source src={audioLink} type="audio/wav" />
      </audio>
    </Dialog>
  );
};

export default VoicesDialog;
