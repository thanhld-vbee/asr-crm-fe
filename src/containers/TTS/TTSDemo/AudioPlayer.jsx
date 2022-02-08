import React from 'react';
import InputRange from 'react-input-range';
import { StyledAudioPlayer } from './index.style';

const AudioPlayer = (props) => {
  const { currentTime, duration, onSeeked } = props;
  return (
    <StyledAudioPlayer>
      <InputRange
        minValue={0}
        maxValue={duration === 0 ? 1 : duration * 1000}
        value={currentTime * 1000}
        onChange={(value) => onSeeked(value / 1000)}
      />
    </StyledAudioPlayer>
  );
};

export default AudioPlayer;
