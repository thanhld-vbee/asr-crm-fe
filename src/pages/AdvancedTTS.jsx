import React from 'react';
import DemoTTSContainer from '@src/containers/AdvancedTTS';
import ComingSoonContainer from '@src/containers/ComingSoon';
import FEATURE_FLAG from '@src/constants/featureFlags.json';

import { useSelector } from 'react-redux';

const AdvancedTTS = () => {
  const { featureFlags } = useSelector((state) => state.featureFlag);

  const feature = featureFlags.find(
    (featureFlag) => featureFlag.name === FEATURE_FLAG.ADVANCED_TTS,
  );
  if (feature && feature.active) return <DemoTTSContainer />;

  return <ComingSoonContainer />;
};

export default AdvancedTTS;
