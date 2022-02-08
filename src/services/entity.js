import { SelectionState } from 'draft-js';

const findItemKeyInMap = (object, value) => {
  let out;
  Object.keys(object).forEach((key) => {
    if (object[key] === value) out = key;
  });
  return out;
};

const getEntityStrategy =
  (mutability) => (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      if (entityKey === null) {
        return false;
      }
      return contentState.getEntity(entityKey).getMutability() === mutability;
    }, callback);
  };

const handleSelection = (editorState) => {
  const selectionState = editorState.getSelection();
  const anchorKey = selectionState.getAnchorKey();
  const start = selectionState.getStartOffset();
  const end = selectionState.getEndOffset();
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  if (start !== end || startKey !== endKey) {
    const newSelectionState = new SelectionState({
      anchorKey,
      anchorOffset: start,
      focusKey: selectionState.getFocusKey(),
      focusOffset: end,
    });
    return newSelectionState;
  }
  return null;
};

export { findItemKeyInMap, getEntityStrategy, handleSelection };
