import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '@src/redux/actions';
import { handleDownload } from '@src/services/tts';

import { IconButton } from '@mui/material';
import {
  VisibilityOutlined,
  VolumeUpOutlined,
  FileDownloadOutlined,
  PauseOutlined,
  Tune,
} from '@mui/icons-material';
import { AUDIO_EFFECTS_URL } from '@src/configs';

const RequestAction = ({ request, onOpenView }) => {
  const { audioLink, isPlaying, duration } = useSelector(
    (state) => state.audioPlayer,
  );

  const dispatch = useDispatch();

  const handleOpenView = (e) => {
    e.stopPropagation();
    onOpenView(request.id);
  };

  const handleDownloadAudioLink = (e) => {
    e.stopPropagation();
    handleDownload(request.audioLink);
  };

  const handleChangePlayAudio = (e) => {
    e.stopPropagation();
    if (audioLink === request.audioLink) {
      dispatch(actions.audioPlayer.updateStatus(!isPlaying));
    } else {
      dispatch(actions.audioPlayer.updateAudioLink(request.audioLink));
      dispatch(actions.audioPlayer.updateStatus(true));
      dispatch(actions.audioPlayer.updateMetaData({ currentTime: 0 }));
    }
  };

  const handleOpenAudioEffects = () => {
    const audio = request.audioLink;
    window.open(`${AUDIO_EFFECTS_URL}/?audio=${audio}`, '_blank');
  };

  const isShowPlaying =
    audioLink === request.audioLink && isPlaying && !!duration;

  return (
    <div className="action-cell">
      <IconButton onClick={handleOpenView}>
        <VisibilityOutlined />
      </IconButton>
      <IconButton onClick={handleChangePlayAudio} disabled={!request.audioLink}>
        {isShowPlaying ? <PauseOutlined /> : <VolumeUpOutlined />}
      </IconButton>
      <IconButton
        onClick={handleDownloadAudioLink}
        disabled={!request.audioLink}
      >
        <FileDownloadOutlined />
      </IconButton>
      <IconButton
        onClick={handleOpenAudioEffects}
        disabled={!request.audioLink}
      >
        <Tune />
      </IconButton>
    </div>
  );
};
export default RequestAction;
