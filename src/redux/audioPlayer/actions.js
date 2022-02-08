export const actionTypes = {
  UPDATE_AUDIO_LINK: 'UPDATE_AUDIO_LINK',
  UPDATE_STATUS: 'UPDATE_STATUS',
  UPDATE_META_DATA: 'UPDATE_META_DATA',

  UPDATE_TRY_LISTENING_SENTENCE: 'UPDATE_TRY_LISTENING_SENTENCE',

  UPDATE_REQUEST_AUDIO_LINK: 'UPDATE_REQUEST_AUDIO_LINK',
};

const updateAudioLink = (audioLink, isPreview) => ({
  type: actionTypes.UPDATE_AUDIO_LINK,
  audioLink,
  isPreview,
});

const updateStatus = (isPlaying) => ({
  type: actionTypes.UPDATE_STATUS,
  isPlaying,
});

const updateMetaData = ({ currentTime, duration }) => ({
  type: actionTypes.UPDATE_META_DATA,
  currentTime,
  duration,
});

const updateTryListeningSentence = ({
  sentenceId,
  isAudioLoading,
  audioLink,
}) => ({
  type: actionTypes.UPDATE_TRY_LISTENING_SENTENCE,
  sentenceId,
  isAudioLoading,
  audioLink,
});

const updateRequestAudioLink = (audioLink) => ({
  type: actionTypes.UPDATE_REQUEST_LINK_AUDIO_PLAYER,
  audioLink,
});

export {
  updateAudioLink,
  updateStatus,
  updateMetaData,
  updateTryListeningSentence,
  updateRequestAudioLink,
};
