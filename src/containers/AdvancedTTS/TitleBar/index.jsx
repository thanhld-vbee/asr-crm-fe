import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import BadgeAvatar from '@src/components/BadgeAvatar';
import { Typography, InputBase } from '@mui/material';
import actions from '@src/redux/actions';
import { StyledTitleBar } from './index.style';

const TitleBar = ({ voice, onOpenVoice }) => {
  const { synthesisRequest } = useSelector((state) => state.synthesisRequest);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleOpenVoices = () => onOpenVoice(true);

  const handleChangeTTSTitle = (e) => {
    const { name, value } = e.target;
    dispatch(actions.synthesisRequest.updateSynthesisRequest(name, value));
  };

  return (
    <StyledTitleBar>
      <InputBase
        value={synthesisRequest.title}
        placeholder={t('addTitle')}
        name="title"
        className="base-input"
        onChange={handleChangeTTSTitle}
      />
      <div className="voice">
        <div
          onClick={handleOpenVoices}
          role="presentation"
          className="choose-voice"
        >
          <BadgeAvatar
            img={voice && voice.roundImage}
            smallImg={voice && voice.language && voice.language.roundImage}
            type="image"
          />
          <Typography variant="h6" className="voice-name">
            {voice && voice.name}
          </Typography>
        </div>
      </div>
    </StyledTitleBar>
  );
};

export default TitleBar;
