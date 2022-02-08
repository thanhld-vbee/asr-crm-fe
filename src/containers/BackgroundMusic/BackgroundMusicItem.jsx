import React, { createRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import apis from '@src/apis';
import { ListItem, Typography, CircularProgress, Box } from '@mui/material';
import {
  FiberManualRecordOutlined,
  PauseOutlined,
  VolumeUpOutlined,
} from '@mui/icons-material';

const initialPlayMusic = {
  musicLink: '',
  playing: false,
};

const BackgroundMusicItem = ({
  backgroundMusic,
  isSelected,
  onSelectedMusic,
}) => {
  const [playMusic, setPlayMusic] = useState(initialPlayMusic);
  const [loading, setLoading] = useState(false);

  const audioRef = createRef();

  const handleSelectedMusic = () => {
    if (isSelected) {
      onSelectedMusic({});
      return;
    }
    onSelectedMusic(backgroundMusic);
  };

  const handlePlayAudio = (url) => {
    setPlayMusic({ playing: true, musicLink: url });
    setLoading(false);
  };

  const handleAudioEnd = () => {
    audioRef.current.pause();
    setPlayMusic(initialPlayMusic);
  };

  const fetchSharingSignedUrl = async (bucket, key) => {
    if (!bucket || !key) return;
    const data = await apis.upload.getSharingPresignedUrl(bucket, key);
    if (data?.status) {
      const { url } = data.result;
      handlePlayAudio(url);
    }
  };

  const handlePlayBackgroundMusic = () => {
    if (playMusic.musicLink) {
      audioRef.current.play();
      setPlayMusic({ ...playMusic, playing: true });
      return;
    }
    setLoading(true);
    if (backgroundMusic.userId) {
      const { host, pathname } = new URL(backgroundMusic.link);
      const bucket = host.split('.')[0];
      const key = pathname.split('/')[1];
      fetchSharingSignedUrl(bucket, key);
    } else {
      handlePlayAudio(backgroundMusic.link);
    }
  };

  const handleStopBackgroundMusic = () => {
    if (isSelected) {
      audioRef.current.pause();
      setPlayMusic((prev) => ({ ...prev, playing: false }));
    }
  };

  const MusicAction = () => {
    if (loading)
      return (
        <div>
          <CircularProgress size={15} className="loading" />
        </div>
      );
    if (playMusic.playing)
      return (
        <Box onClick={handleStopBackgroundMusic}>
          <PauseOutlined />
        </Box>
      );
    return (
      <div
        onClick={handlePlayBackgroundMusic}
        role="presentation"
        className="play-audio-button"
      >
        <VolumeUpOutlined />
      </div>
    );
  };

  useEffect(() => {
    if (!isSelected) {
      audioRef.current.load();
      setPlayMusic({ ...playMusic, playing: false });
    }
  }, [isSelected]);

  useEffect(() => {
    if (playMusic.musicLink) audioRef.current.load();
  }, [playMusic.musicLink]);

  return (
    <ListItem
      className={classNames('list-item', { selected: isSelected })}
      onClick={handleSelectedMusic}
      secondaryAction={<MusicAction />}
    >
      <FiberManualRecordOutlined
        sx={{ fontSize: 12 }}
        className={classNames('list-item-icon', { selected: isSelected })}
      />
      <Typography variant="body2">{backgroundMusic?.name}</Typography>
      <audio
        ref={audioRef}
        autoPlay={playMusic.playing}
        onEnded={handleAudioEnd}
      >
        <source src={playMusic.musicLink} />
        <track kind="captions" />
      </audio>
    </ListItem>
  );
};

export default BackgroundMusicItem;
