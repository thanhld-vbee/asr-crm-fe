import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { OrderedSet } from 'immutable';
import { Editor, EditorState, ContentState } from 'draft-js';
import actions from '@src/redux/actions';
import { getSelectedText, generateDecorator } from '@src/services/sentence';
import classNames from 'classnames';
import BreakTimeHighlight from '@src/containers/TTS/BreakTimeHightLight';
import { BREAK_TIME_REGEX } from '@src/constants/voice';
import { countTextLength } from '@src/services/tts';
import Sentences from './Sentences';

import { StyledContent } from './index.style';

const Content = ({
  openSentences,
  sentences,
  content,
  characterExceed,
  onChangeContent,
  onChangeInputLength,
  onChangeSentences,
  onChangeCharacterExceed,
  onchangeSynthesisSentence,
  onTryListeningSentence,
  onChangeOpenSentences,
  onChangeVoice,
}) => {
  const { synthesisRequest, loadingSynthesisConfig } = useSelector(
    (state) => state.synthesisRequest,
  );
  const { usingPackage } = useSelector((state) => state.user);

  const totalCharacters = usingPackage?.maxLengthInputText || 0;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChangeEditor = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const lengthContent = countTextLength(contentState.getPlainText());

    onChangeInputLength(lengthContent);

    let newContent = editorState;
    const currentStyle = editorState.getCurrentInlineStyle();
    if (currentStyle && currentStyle.size) {
      newContent = EditorState.setInlineStyleOverride(
        editorState,
        OrderedSet.of(),
      );
    }
    onChangeContent(newContent);

    if (lengthContent > totalCharacters) {
      onChangeCharacterExceed(true);
    } else {
      onChangeCharacterExceed(false);
    }

    const selectedText = getSelectedText(editorState);
    onchangeSynthesisSentence(selectedText);
  };

  useEffect(() => {
    if (loadingSynthesisConfig) {
      const {
        text,
        sentences: synthesisConfigSentences,
        characters,
        voice,
      } = synthesisRequest;

      onChangeInputLength(characters);
      onChangeVoice(voice);
      if (text) {
        onChangeOpenSentences(false);
        const contentEditor = EditorState.createWithContent(
          ContentState.createFromText(text),
          generateDecorator(BREAK_TIME_REGEX, BreakTimeHighlight),
        );
        onChangeContent(contentEditor);
      } else {
        onChangeOpenSentences(true);
        const newSentences = synthesisConfigSentences.map((item) => ({
          ...item,
          id: uuidv4(),
        }));
        onChangeSentences(newSentences);
      }
      dispatch(
        actions.audioPlayer.updateMetaData({ currentTime: 0, duration: 0 }),
      );
      dispatch(actions.audioPlayer.updateStatus(false));
      const audioLink = synthesisRequest.audioLink || '';
      dispatch(actions.audioPlayer.updateAudioLink(audioLink));
      dispatch(actions.synthesisRequest.updateLoadingSynthesisConfig(false));
    }
  }, [loadingSynthesisConfig]);

  return (
    <StyledContent>
      {openSentences ? (
        <Sentences
          sentences={sentences}
          characterExceed={characterExceed}
          onChangeSentences={onChangeSentences}
          onChangeInputLength={onChangeInputLength}
          onChangeCharacterExceed={onChangeCharacterExceed}
          onTryListeningSentence={onTryListeningSentence}
        />
      ) : (
        <div
          className={classNames('editor-wrapper', {
            'character-exceed': characterExceed,
          })}
          onBlur={() => onchangeSynthesisSentence()}
        >
          <Editor
            placeholder={`${t('enterTextHere')}...`}
            editorState={content}
            onChange={handleChangeEditor}
            stripPastedStyles
          />
        </div>
      )}
    </StyledContent>
  );
};

export default Content;
