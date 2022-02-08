import React from 'react';
import { IconButton, Typography } from '@mui/material';
import { Pause, PlayArrowOutlined } from '@mui/icons-material';
import BadgeAvatar from '@src/components/BadgeAvatar';
import { StyledVoiceItem } from './index.style';

const VoiceItem = ({
  voice,
  activeVoiceId,
  onChangePlayAudio,
  onSelectedVoice,
}) => {
  const handleChangePlayAudio = (e) => {
    e.stopPropagation();
    onChangePlayAudio(voice);
  };

  return (
    <StyledVoiceItem
      active={voice.id === activeVoiceId}
      onClick={() => onSelectedVoice(voice)}
      role="presentation"
    >
      <div className="voice-info">
        <BadgeAvatar
          img={voice.roundImage}
          smallImg={voice && voice.language && voice.language.roundImage}
          type="image"
        />
        <Typography variant="h6" className="voice-name">
          {voice.name}
        </Typography>
      </div>
      <IconButton onClick={handleChangePlayAudio}>
        {voice.playStatus ? (
          <Pause className="play-icon" fontSize="large" />
        ) : (
          <PlayArrowOutlined className="play-icon" fontSize="large" />
        )}
      </IconButton>
    </StyledVoiceItem>
  );
};
export default VoiceItem;
