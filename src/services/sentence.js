import { v4 as uuidv4 } from 'uuid';
import { CompositeDecorator } from 'draft-js';

const onHandleEnterCommand = ({
  selectedText1,
  selectedText2,
  sentence,
  sentences,
  onChangeSentences,
}) => {
  const splitSentences = [
    { ...sentence, text: selectedText1, onLoad: true },
    {
      ...sentence,
      text: selectedText2,
      id: uuidv4(),
      onLoad: true,
      mousePointerPosition: 0,
    },
  ];
  const index = sentences.findIndex((item) => item.id === sentence.id);
  if (index >= 0) {
    const newSentences = [
      ...sentences.slice(0, index),
      ...splitSentences,
      ...sentences.slice(index + 1),
    ];
    onChangeSentences(newSentences);
  }
};

const onHandleBackspaceCommand = ({
  selectedText2,
  sentence,
  sentences,
  onChangeSentences,
}) => {
  const index = sentences.findIndex((item) => item.id === sentence.id);
  if (index >= 1) {
    const sentenceText = sentences[index - 1].text;
    const newSentences = [
      ...sentences.slice(0, index - 1),
      {
        ...sentences[index - 1],
        text: sentenceText + selectedText2,
        onLoad: true,
        mousePointerPosition: sentenceText.length,
      },
      ...sentences.slice(index + 1),
    ];
    onChangeSentences(newSentences);
  }
};

const onHandleKeyCommand = ({
  content,
  command,
  sentence,
  sentences,
  onChangeSentences,
}) => {
  const selectionState = content.getSelection();
  const anchorKey = selectionState.getAnchorKey();
  const currentContent = content.getCurrentContent();
  const offset = selectionState.getStartOffset();

  const blockMap = currentContent.getBlockMap();
  const currentBlock = blockMap.get(anchorKey);

  const beforeBlocks = blockMap.toSeq().takeUntil((v) => v === currentBlock);
  const beforeBlocksText = beforeBlocks.map((block) => block.text).join('\n');
  const beforeCurrentBlockText = currentBlock.getText().slice(0, offset);
  const selectedText1 = beforeBlocksText
    ? `${beforeBlocksText}\n${beforeCurrentBlockText}`
    : beforeCurrentBlockText;

  const afterBlocks = blockMap
    .toSeq()
    .skipUntil((v) => v === currentBlock)
    .rest();
  const afterBlocksText = afterBlocks.map((block) => block.text).join('\n');
  const afterCurrentBlockText = currentBlock.getText().slice(offset);
  const selectedText2 = afterBlocksText
    ? `${afterCurrentBlockText}\n${afterBlocksText}`
    : afterCurrentBlockText;

  if (command === 'enter_command') {
    onHandleEnterCommand({
      selectedText1,
      selectedText2,
      sentence,
      sentences,
      onChangeSentences,
    });
    return 'handled';
  }

  if (!selectedText1 && command === 'backspace') {
    onHandleBackspaceCommand({
      selectedText2,
      sentence,
      sentences,
      onChangeSentences,
    });
    return 'handled';
  }
  return 'not-handled';
};

const getSelectedText = (editorState) => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

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

  const selectedText = selectedBlock
    .map((block) => {
      const key = block?.getKey() || '';
      const text = block?.getText() || '';
      const start = key === startKey ? selectionState.getStartOffset() : 0;
      const end = key === endKey ? selectionState.getEndOffset() : text.length;
      return text.slice(start, end);
    })
    .join('\n');

  return selectedText;
};

const findWithRegex = (regex, contentBlock, callback) => {
  const text = contentBlock.getText();
  let matchArr;
  let start;
  // eslint-disable-next-line no-cond-assign
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
};

const generateDecorator = (regex, ComponentHighlight) =>
  new CompositeDecorator([
    {
      strategy: (contentBlock, callback) =>
        findWithRegex(regex, contentBlock, callback),
      component: ComponentHighlight,
    },
  ]);

export { onHandleKeyCommand, getSelectedText, generateDecorator };
