import { VIETNAMESE_LETTERS } from '@src/constants/voice';

const checkValidateWord = (wordList, word) => {
  const wordRegex = `^[a-zA-Z${VIETNAMESE_LETTERS}]+((-|&)?[a-zA-Z${VIETNAMESE_LETTERS}]+)*(\\.)?$`;
  const regex = new RegExp(wordRegex);
  if (!word.match(regex)) return false;

  const isDuplicate = wordList.some(
    (item) => item.word.trim().toLowerCase() === word.trim().toLowerCase(),
  );
  if (isDuplicate) return false;

  return true;
};

const checkValidatePronunciation = (pronunciation) => {
  const pronunciationRegex = `^[a-zA-Z${VIETNAMESE_LETTERS}]+((-|\\s)?[a-zA-Z${VIETNAMESE_LETTERS}]+)+$`;
  const regex = new RegExp(pronunciationRegex);
  return pronunciation.match(regex);
};

export { checkValidateWord, checkValidatePronunciation };
