import { convertFromRaw, convertToRaw } from 'draft-js';
import { v4 as uuidv4 } from 'uuid';

const convertParagraphsToState = (paragraphs) => {
  const rawContent = { blocks: [], entityMap: {} };

  paragraphs.forEach((paragraph) => {
    const { elements, text, key } = paragraph;

    const newBlocks = {
      key,
      text,
      type: 'unstyled',
      entityRanges: [],
    };

    const elementsHasStyle = elements.filter((item) => item.name);

    elementsHasStyle.forEach((param) => {
      const { startOffset, endOffset, name, value } = param;
      const style = `${name}-${value}`.toUpperCase();

      newBlocks.entityRanges.push({
        offset: startOffset,
        length: endOffset - startOffset,
        key: style,
      });

      // Add an element in entityMap if value dont exists yet
      const entityMapExist = Object.keys(rawContent.entityMap).findIndex(
        (item) => item === style,
      );

      if (entityMapExist === -1) {
        rawContent.entityMap[style] = {};
        rawContent.entityMap[style].data = {
          name,
          value,
        };
        rawContent.entityMap[style].type = 'TOKEN';
        rawContent.entityMap[style].mutability = 'MUTABLE';
      }
    });
    rawContent.blocks.push(newBlocks);
  });
  return convertFromRaw(rawContent);
};

const getElement = (text, startOffset, endOffset) => ({
  key: uuidv4(),
  name: null,
  value: null,
  startOffset,
  endOffset,
  text: text.substring(startOffset, endOffset),
});

const handleEditParagraphs = (paragraphs, editorState) => {
  const newParagraphs = [...paragraphs];

  const selectionState = editorState.getSelection();
  const anchorKey = selectionState.getAnchorKey();
  const currentContent = editorState.getCurrentContent();
  const currentContentBlock = currentContent.getBlockForKey(anchorKey);
  const selectedText = currentContentBlock.getText();
  const { entityMap } = convertToRaw(currentContent);

  const blockMaps = convertToRaw(currentContent).blocks;
  const blockIndex = blockMaps.findIndex((item) => item.key === anchorKey);
  if (blockIndex === -1) return newParagraphs;
  const currentBlock = blockMaps[blockIndex];

  // In case of adding or removing a block, the paragraph will change
  if (blockMaps.length !== newParagraphs.length) {
    const paragraphArray = [];

    blockMaps.forEach((block) => {
      const paragraphExist = newParagraphs.find(
        (item) => item.key === block.key,
      );
      if (paragraphExist && paragraphExist.textString === block.text) {
        // paragraph already exists, push to the array
        paragraphArray.push(paragraphExist);
      } else {
        // paragraph dont exists, create new paragraph with information of block
        const { text, key } = block;
        const element = getElement(text, 0, text.length);
        const newParagraph = { key, text, elements: [element] };
        paragraphArray.push(newParagraph);
      }
    });

    return paragraphArray;
  }

  // In case of add text in block
  const { entityRanges } = currentBlock;
  let startIndex = 0;
  let endIndex = 0;
  const elements = [];

  if (entityRanges.length !== 0) {
    entityRanges.forEach((entity) => {
      if (startIndex < entity.offset) {
        const element = getElement(selectedText, startIndex, entity.offset);
        elements.push(element);
        startIndex = entity.offset;
        endIndex = entity.offset;
      }

      const element = {
        key: uuidv4(),
        endOffset: entity.offset + entity.length,
        startOffset: entity.offset,
        name: entityMap[entity.key].data.name,
        value: entityMap[entity.key].data.value,
        text: selectedText.substring(
          entity.offset,
          entity.offset + entity.length,
        ),
      };

      elements.push(element);
      startIndex = entity.offset + entity.length;
      endIndex = entity.offset + entity.length;
    });

    if (endIndex !== selectedText.length) {
      const element = getElement(selectedText, endIndex, selectedText.length);
      elements.push(element);
    }
  } else {
    const data = getElement(selectedText, 0, selectedText.length);
    elements.push(data);
  }

  // update current paragraph
  newParagraphs[blockIndex].elements = elements;
  newParagraphs[blockIndex].text = selectedText;

  return newParagraphs;
};

const handleSelectedParagraph = (selectionState, contentState) => {
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  const blocks = contentState.getBlockMap();
  let lastWasEnd = false;

  const selectedBlock = blocks
    .skipUntil((block) => block?.getKey() === startKey)
    .takeUntil((block) => {
      const result = lastWasEnd;
      if (block?.getKey() === endKey) lastWasEnd = true;
      return result;
    });

  const selectedParagraph = [];

  // eslint-disable-next-line array-callback-return
  const selectedText = selectedBlock
    .map((block) => {
      const key = block?.getKey() || '';
      const text = block?.getText() || '';
      const startOffset =
        key === startKey ? selectionState.getStartOffset() : 0;
      const endOffset =
        key === endKey ? selectionState.getEndOffset() : text.length;
      if (text) {
        selectedParagraph.push({ blockKey: key, startOffset, endOffset });
      }
      return text.slice(startOffset, endOffset);
    })
    .join('\n');

  return { selectedText, selectedParagraph };
};

const getPositionSelectedElement = ({ elements, startOffset, endOffset }) => {
  let replaceIndex = null;
  let newStartOffset = null;
  let newEndOffset = null;

  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];

    const hasChangeElement =
      element.startOffset === startOffset ||
      element.endOffset === endOffset ||
      (element.startOffset < endOffset && element.endOffset > endOffset) ||
      (element.startOffset < startOffset && element.endOffset > startOffset);

    if (hasChangeElement) {
      if (replaceIndex == null) replaceIndex = i;
      if (newStartOffset == null) newStartOffset = element.startOffset;
      newEndOffset = element.endOffset;
      elements.splice(i, 1);
      i -= 1;
    }
  }

  return { replaceIndex, newStartOffset, newEndOffset };
};

const handleSingleSelectedParagraph = ({
  currentParagraph,
  startOffset,
  endOffset,
  elementName,
  elementValue,
}) => {
  const { elements, text } = currentParagraph;

  // eslint-disable-next-line prefer-const
  let { replaceIndex, newStartOffset, newEndOffset } =
    getPositionSelectedElement({
      elements,
      startOffset,
      endOffset,
    });

  if (newStartOffset !== startOffset) {
    const space = getElement(text, newStartOffset, startOffset);
    elements.splice(replaceIndex, 0, space);
    replaceIndex += 1;
  }

  if (startOffset !== endOffset) {
    const newText = text.substring(startOffset, endOffset);
    const word = {
      key: uuidv4(),
      startOffset,
      endOffset,
      text: newText,
      name: elementName.toUpperCase(),
      elementValue,
    };
    elements.splice(replaceIndex, 0, word);
    replaceIndex += 1;
  }

  if (endOffset !== newEndOffset) {
    const space = getElement(text, endOffset, newEndOffset);
    elements.splice(replaceIndex, 0, space);
    replaceIndex += 1;
  }

  return { ...currentParagraph, elements };
};

const handleSelectedElement = ({
  paragraphs,
  selectedParagraph,
  elementName,
  elementValue,
}) => {
  const newParagraphs = [...paragraphs];

  // eslint-disable-next-line array-callback-return
  selectedParagraph.map((elem) => {
    const { blockKey, startOffset, endOffset } = elem;

    const paragraphIndex = newParagraphs.findIndex(
      (item) => item.key === blockKey,
    );

    if (paragraphIndex === -1) return;
    const currentParagraph = newParagraphs[paragraphIndex];
    const newParagraph = handleSingleSelectedParagraph({
      currentParagraph,
      startOffset,
      endOffset,
      elementName,
      elementValue,
    });

    newParagraphs[paragraphIndex] = newParagraph;
  });

  return newParagraphs;
};

export {
  convertParagraphsToState,
  handleEditParagraphs,
  handleSelectedParagraph,
  handleSelectedElement,
};
