import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';

// import { HelpOutlineOutlined } from '@mui/icons-material';
import CustomSwitch from '@src/components/Switch';
import { COLOR } from '@src/styles/color';
import { checkFeaturePermission } from '@src/services/tts';
import { FEATURE } from '@src/constants/package';
import { StyledProcessingMethods } from './index.style';

const ProcessingMethods = ({ isSSML, openSentences, onOpenSentences }) => {
  const { t } = useTranslation();

  const { usingPackage } = useSelector((state) => state.user);

  const hasTtsBySentence =
    usingPackage.id &&
    checkFeaturePermission(usingPackage.features, FEATURE.TTS_BY_SENTENCE);

  return (
    <StyledProcessingMethods>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        className="switch-wrapper"
      >
        <Typography variant="body2">{t('paragraphProcess')}</Typography>
        <CustomSwitch
          checked={openSentences}
          noneCheckedColor={COLOR.primary}
          onChange={onOpenSentences}
          disabled={!hasTtsBySentence || isSSML}
        />
        <Typography variant="body2">{t('sentenceProcess')}</Typography>
      </Stack>
      {/* <HelpOutlineOutlined className="icon" /> */}
    </StyledProcessingMethods>
  );
};

export default ProcessingMethods;
