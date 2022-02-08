import React, { createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import actions from '@src/redux/actions';
import { formatAudioTime } from '@src/utils/time';
import { handleDownload } from '@src/services/tts';

import { IconButton, Typography, CircularProgress } from '@mui/material';
import {
  PlayArrowOutlined,
  PauseOutlined,
  FileDownloadOutlined,
} from '@mui/icons-material';

import IconSeekForward from '@src/assets/icons/seek-forward.svg';
import IconSeekRewind from '@src/assets/icons/seek-rewind.svg';

import AudioPlayer from './AudioPlayer';
import { StyledTTSDemo } from './index.style';

const REWIND_TIME_IN_SECOND = 5;

const TTSDemo = () => {
  const {
    audioLink,
    isPlaying,
    currentTime,
    duration,
    isAudioLoading,
    isPreview,
  } = useSelector((state) => state.audioPlayer);

  const audioRef = createRef();
  const dispatch = useDispatch();

  const handleAudioTimeUpdate = () => {
    const time = audioRef.current.currentTime;
    dispatch(actions.audioPlayer.updateMetaData({ currentTime: time }));
  };

  const handleLoadedMetadata = () => {
    const audioDuration = audioRef.current.duration;
    dispatch(actions.audioPlayer.updateMetaData({ duration: audioDuration }));
  };

  const handleAudioEnd = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    dispatch(actions.audioPlayer.updateStatus(false));
    dispatch(actions.audioPlayer.updateMetaData({ currentTime: 0 }));
  };

  const handleSeeked = (time) => {
    audioRef.current.currentTime = time;
    dispatch(actions.audioPlayer.updateMetaData({ currentTime: time }));
  };

  const handleChangePlayAudio = () => {
    dispatch(actions.audioPlayer.updateStatus(!isPlaying));
  };

  const isShowLoading = isPlaying && !duration;
  const isShowPlaying = isPlaying && !!duration;

  useEffect(() => {
    audioRef.current.load();
    audioRef.current.currentTime = currentTime;

    if (audioLink && isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    if (isPlaying && isAudioLoading) {
      dispatch(
        actions.audioPlayer.updateTryListeningSentence({
          sentenceId: '',
          isAudioLoading: false,
        }),
      );
    }
  }, [audioLink, isPlaying]);

  return (
    <StyledTTSDemo isPreview={isPreview}>
      <audio
        ref={audioRef}
        autoPlay={isPlaying}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnd}
      >
        <source src={audioLink} />
        <track kind="captions" />
      </audio>
      <div className="action-wrapper">
        <div className="time-line">
          <Typography className="current-time">
            {formatAudioTime(currentTime)}
          </Typography>
          <Typography> / </Typography>
          <Typography className="duration">
            {formatAudioTime(duration)}
          </Typography>
        </div>
        <div className="audio-action align-center">
          <IconButton
            onClick={() => handleSeeked(currentTime - REWIND_TIME_IN_SECOND)}
            disabled={currentTime === 0 || !audioLink}
          >
            <img src={IconSeekRewind} alt="seek-rewind" />
          </IconButton>
          <IconButton onClick={handleChangePlayAudio} disabled={!audioLink}>
            {isShowLoading && (
              <CircularProgress size={15} thickness={8} className="loading" />
            )}
            {isShowPlaying && <PauseOutlined fontSize="large" />}
            {!isShowLoading && !isShowPlaying && (
              <PlayArrowOutlined fontSize="large" />
            )}
          </IconButton>
          <IconButton
            onClick={() => handleSeeked(currentTime + REWIND_TIME_IN_SECOND)}
            disabled={currentTime > duration || !audioLink}
          >
            <img src={IconSeekForward} alt="seek-forward" />
          </IconButton>
        </div>
        <div className="extra-action align-right">
          <IconButton
            onClick={() => handleDownload(audioLink)}
            disabled={!audioLink}
            className="download-audio"
          >
            <FileDownloadOutlined />
          </IconButton>
        </div>
      </div>
      <div className="audio-player">
        <AudioPlayer
          currentTime={currentTime}
          duration={duration}
          onSeeked={handleSeeked}
        />
      </div>
    </StyledTTSDemo>
  );
};

export default TTSDemo;
