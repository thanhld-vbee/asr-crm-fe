import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { VolumeUpOutlined } from '@mui/icons-material';

import { formatCommasThousand } from '@src/utils/number';
import { formatAudioTime } from '@src/utils/time';

import ProcessHandler from '@src/components/ProcessHandler';
import { StyledConvertAction } from './index.style';

const SECONDS_PER_CHARACTER = 60 / 1000;

const ConvertAction = ({
  voice,
  loading,
  synthesisRequest,
  synthesisSentence,
  openSentences,
  inputLength,
  characterExceed,
  onCreateSynthesis,
  onTryListeningSentence,
}) => {
  const { isAudioLoading } = useSelector((state) => state.audioPlayer);
  const { usingPackage, remainingCharacters, bonusCharacters } = useSelector(
    (state) => state.user,
  );

  const totalCharacters = usingPackage?.maxLengthInputText || 0;

  const { t } = useTranslation();

  const showNumberCharacters = () =>
    `${formatCommasThousand(inputLength)} /
    ${formatCommasThousand(totalCharacters)} ${t('characters')}`;

  const handleTryListening = () => {
    const sentence = {
      text: synthesisSentence,
      voice,
      speed: synthesisRequest.speed,
    };
    onTryListeningSentence(sentence);
  };

  const estimateAudioLength = formatAudioTime(
    inputLength * SECONDS_PER_CHARACTER,
  );

  const canPreview = synthesisSentence && usingPackage.id && !isAudioLoading;

  const hasConvertTts = remainingCharacters + bonusCharacters > 0 && !loading;

  return (
    <StyledConvertAction>
      <Box className="note">
        <Typography
          variant="body2"
          className={classNames({ hide: openSentences })}
        >
          {t('noteTryListening')}
        </Typography>
        <Typography variant="body2">
          {`${t('estimatedAudioLength')} ${estimateAudioLength}`}
        </Typography>
      </Box>
      <div className="action">
        <div>
          <Button
            color="secondary"
            variant="outlined"
            className={classNames('listening-button', { hide: openSentences })}
            onClick={handleTryListening}
            onMouseDown={(e) => e.preventDefault()}
            disabled={!canPreview}
          >
            {isAudioLoading ? (
              <CircularProgress size={15} thickness={8} className="loading" />
            ) : (
              <VolumeUpOutlined />
            )}
            {t('preview')}
          </Button>
        </div>
        <div className="align-center">
          <Typography
            variant="body2"
            className={classNames({
              'character-exceed': characterExceed,
            })}
          >
            {showNumberCharacters()}
          </Typography>
        </div>
        <div className="align-right">
          <Button
            color="primary"
            variant="contained"
            disabled={!hasConvertTts}
            onClick={onCreateSynthesis}
          >
            <ProcessHandler
              loading={loading}
              ml="46px"
              mr="46px"
              size={24}
              align="center"
              color="divider"
            >
              {t('textTransfer')}
            </ProcessHandler>
          </Button>
        </div>
      </div>
    </StyledConvertAction>
  );
};

export default ConvertAction;
