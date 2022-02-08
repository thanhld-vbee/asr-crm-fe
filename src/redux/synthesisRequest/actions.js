export const actionTypes = {
  UPDATE_SYNTHESIS_REQUEST: 'UPDATE_SYNTHESIS_REQUEST',
  UPDATE_SYNTHESIS_CONFIG: 'UPDATE_SYNTHESIS_CONFIG',
  UPDATE_LOADING_SYNTHESIS_CONFIG: 'UPDATE_LOADING_SYNTHESIS_CONFIG',
  UPDATE_BACKGROUND_MUSIC: 'UPDATE_BACKGROUND_MUSIC',
  UPDATE_VOLUME_BACKGROUND_MUSIC: 'UPDATE_VOLUME_BACKGROUND_MUSIC',
  UPDATE_PARAGRAPHS: 'UPDATE_PARAGRAPHS',
  UPDATE_LOADING_PARAGRAPHS: 'UPDATE_LOADING_PARAGRAPHS',
  UPDATE_SELECTED_PARAGRAPH: 'UPDATE_SELECTED_PARAGRAPH',
};

const updateSynthesisRequest = (name, value) => ({
  type: actionTypes.UPDATE_SYNTHESIS_REQUEST,
  name,
  value,
});

const updateSynthesisConfig = (synthesisRequest) => ({
  type: actionTypes.UPDATE_SYNTHESIS_CONFIG,
  synthesisRequest,
});

const updateLoadingSynthesisConfig = (loading) => ({
  type: actionTypes.UPDATE_LOADING_SYNTHESIS_CONFIG,
  loading,
});

const updateBackgroundMusic = (name, link) => ({
  type: actionTypes.UPDATE_BACKGROUND_MUSIC,
  name,
  link,
});

const updateVolumeBackgroundMusic = (volume) => ({
  type: actionTypes.UPDATE_VOLUME_BACKGROUND_MUSIC,
  volume,
});

const updateParagraphs = (paragraphs) => ({
  type: actionTypes.UPDATE_PARAGRAPHS,
  paragraphs,
});

const updateLoadingParagraphs = (loading) => ({
  type: actionTypes.UPDATE_LOADING_PARAGRAPHS,
  loading,
});

const updateSelectedParagraph = (data) => ({
  type: actionTypes.UPDATE_SELECTED_PARAGRAPH,
  data,
});

export {
  updateSynthesisRequest,
  updateSynthesisConfig,
  updateLoadingSynthesisConfig,
  updateBackgroundMusic,
  updateVolumeBackgroundMusic,
  updateParagraphs,
  updateLoadingParagraphs,
  updateSelectedParagraph,
};
