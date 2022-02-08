import { actionTypes } from './actions';

export const initialState = {
  audioLink: '',
  isPlaying: '',
  sentenceId: '',
  isAudioLoading: '',
  currentTime: 0,
  duration: 0,
  requestAudioLink: '',
  sentenceAudioLink: '',
  isPreview: false,
};

const audioPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_AUDIO_LINK: {
      const { audioLink, isPreview } = action;
      return { ...state, audioLink, isPreview };
    }

    case actionTypes.UPDATE_STATUS: {
      const { isPlaying } = action;
      return { ...state, isPlaying };
    }

    case actionTypes.UPDATE_META_DATA: {
      const { currentTime, duration } = action;

      const newState = {
        ...state,
        currentTime:
          typeof currentTime === 'number' ? currentTime : state.currentTime,
        duration: typeof duration === 'number' ? duration : state.duration,
      };
      return newState;
    }

    case actionTypes.UPDATE_TRY_LISTENING_SENTENCE: {
      const { sentenceId, isAudioLoading, audioLink } = action;

      const newState = {
        ...state,
        sentenceId: sentenceId || state.sentenceId,
        isAudioLoading:
          isAudioLoading !== 'undefined'
            ? isAudioLoading
            : state.isAudioLoading,
        sentenceAudioLink:
          audioLink !== 'undefined' ? audioLink : state.audioLink,
      };
      return newState;
    }

    case actionTypes.UPDATE_REQUEST_AUDIO_LINK: {
      const { audioLink } = action;

      return { ...state, requestAudioLink: audioLink };
    }

    default:
      return state;
  }
};

export default audioPlayerReducer;
