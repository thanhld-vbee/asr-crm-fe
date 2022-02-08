import { DEFAULT_SYNTHESIS_REQUEST } from '@src/constants/voice';
import { actionTypes } from './actions';

export const initialState = {
  synthesisRequest: DEFAULT_SYNTHESIS_REQUEST,
  loadingSynthesisConfig: false,
  paragraphs: [],
  isLoadingParagraphs: false,
  selectedParagraph: [],
};

const synthesisRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SYNTHESIS_REQUEST: {
      const { name, value } = action;
      return {
        ...state,
        synthesisRequest: { ...state.synthesisRequest, [name]: value },
      };
    }

    case actionTypes.UPDATE_SYNTHESIS_CONFIG: {
      const { synthesisRequest } = action;
      return { ...state, synthesisRequest };
    }

    case actionTypes.UPDATE_LOADING_SYNTHESIS_CONFIG: {
      const { loading } = action;
      return { ...state, loadingSynthesisConfig: loading };
    }

    case actionTypes.UPDATE_BACKGROUND_MUSIC: {
      const { name, link } = action;
      const backgroundMusic = {
        ...state.synthesisRequest.backgroundMusic,
        name,
        link,
      };

      return {
        ...state,
        synthesisRequest: {
          ...state.synthesisRequest,
          backgroundMusic,
        },
      };
    }

    case actionTypes.UPDATE_VOLUME_BACKGROUND_MUSIC: {
      const { volume } = action;
      const backgroundMusic = {
        ...state.synthesisRequest.backgroundMusic,
        volume,
      };

      return {
        ...state,
        synthesisRequest: {
          ...state.synthesisRequest,
          backgroundMusic,
        },
      };
    }

    case actionTypes.UPDATE_PARAGRAPHS: {
      const { paragraphs } = action;
      return { ...state, paragraphs };
    }

    case actionTypes.UPDATE_LOADING_PARAGRAPHS: {
      const { loading } = action;
      return { ...state, isLoadingParagraphs: loading };
    }

    case actionTypes.UPDATE_SELECTED_PARAGRAPH: {
      const { data } = action;
      return { ...state, selectedParagraph: data };
    }
    default:
      return state;
  }
};

export default synthesisRequestReducer;
