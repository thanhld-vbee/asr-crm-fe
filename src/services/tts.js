import { v4 as uuidv4 } from 'uuid';
import {
  DEFAULT_BREAK_TIME,
  DEFAULT_SPEED,
  BREAK_TIME_REGEX,
} from '@src/constants/voice';

const splitParagraphIntoSentence = (paragraph, voice) => {
  const BREAK_LINE_DELIMITER = /\r?\n/;
  const EMPTY_LINE = /^\s*\n/gm;
  const stringRemoveEmptyLine = paragraph.trim().replace(EMPTY_LINE, '');
  const sentencesTokenizer = stringRemoveEmptyLine.split(BREAK_LINE_DELIMITER);

  const newSentences = sentencesTokenizer.map((item) => {
    const text = item.replace(BREAK_TIME_REGEX, '');
    return {
      id: uuidv4(),
      voice,
      text,
      breakTime: DEFAULT_BREAK_TIME,
      speed: DEFAULT_SPEED,
    };
  });

  return newSentences;
};

const getSentencesPayload = (sentences, totalCharacters) => {
  const contentLength = sentences.reduce(
    (sum, item) => (item.text ? sum + item.text.trim().length : sum),
    0,
  );
  if (contentLength === 0 || contentLength > totalCharacters) return [];

  const sentencesPayload = sentences.reduce((acc, current) => {
    if (current.text) {
      return [
        ...acc,
        {
          text: current.text,
          voiceCode: current.voice && current.voice.code,
          breakTime: current.breakTime,
          speed: current.speed,
        },
      ];
    }
    return acc;
  }, []);
  return sentencesPayload;
};

const handleDownload = async (url) => {
  // TODO: pass name variable
  if (!url) return;
  const link = document.createElement('a');
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const countTextLength = (text) => {
  const normalizeText = text.replace(BREAK_TIME_REGEX, '');
  const textLength = normalizeText.trim().length;
  return textLength;
};

const checkFeaturePermission = (userFeatures = [], feature = '') =>
  userFeatures.includes(feature);

const checkValidXml = (xml) => {
  const oParser = new DOMParser();
  const oDOM = oParser.parseFromString(xml, 'application/xml');
  const isInvalidXML =
    oDOM.documentElement.getElementsByTagName('parsererror').length;
  return !isInvalidXML;
};

export {
  splitParagraphIntoSentence,
  getSentencesPayload,
  handleDownload,
  countTextLength,
  checkFeaturePermission,
  checkValidXml,
};
