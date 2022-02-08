export const actionTypes = {
  SYNTHESIS_RESPONSE: 'SYNTHESIS_RESPONSE',
};

const addSynthesisResponse = (requestId, audioLink, status, progress) => ({
  type: actionTypes.SYNTHESIS_RESPONSE,
  requestId,
  audioLink,
  status,
  progress,
});

export { addSynthesisResponse };
