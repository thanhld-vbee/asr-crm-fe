import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';
import actions from '@src/redux/actions';
import classNames from 'classnames';

import { countTextLength } from '@src/services/tts';
import {
  handleEditParagraphs,
  convertParagraphsToState,
  handleSelectedParagraph,
} from '@src/services/paragraph';
import { getEntityStrategy, handleSelection } from '@src/services/entity';

import HightLightSpan from './HightLightSpan';
import Sentences from './Sentences';

import { StyledContent, StyledMapEditor } from './index.style';

const Content = ({
  openSentences,
  sentences,
  characterExceed,
  onChangeInputLength,
  onChangeSentences,
  onChangeCharacterExceed,
  onchangeSynthesisSentence,
  onTryListeningSentence,
  onChangeOpenSentences,
  onChangeVoice,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const {
    synthesisRequest,
    loadingSynthesisConfig,
    paragraphs,
    isLoadingParagraphs,
  } = useSelector((state) => state.synthesisRequest);

  const { usingPackage } = useSelector((state) => state.user);

  const totalCharacters = usingPackage?.maxLengthInputText || 0;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (loadingSynthesisConfig) {
      const {
        text,
        sentences: synthesisConfigSentences,
        characters,
        voice,
        paragraphs: newParagraphs,
      } = synthesisRequest;

      onChangeInputLength(characters);
      onChangeVoice(voice);
      if (text) {
        onChangeOpenSentences(false);
        dispatch(actions.synthesisRequest.updateParagraphs(newParagraphs));
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

  const handleShowContent = () => {
    const contentState = convertParagraphsToState(paragraphs);
    const decorator = new CompositeDecorator([
      {
        strategy: getEntityStrategy('MUTABLE'),
        component: HightLightSpan,
      },
    ]);

    setEditorState(EditorState.createWithContent(contentState, decorator));
  };

  useEffect(() => {
    if (isLoadingParagraphs) {
      handleShowContent();
      dispatch(actions.synthesisRequest.updateLoadingParagraphs(false));
    }
  }, [isLoadingParagraphs]);

  const handleChangeEditorState = (newEditorState) => {
    const contentState = newEditorState.getCurrentContent();
    const contentLength = countTextLength(contentState.getPlainText());
    onChangeInputLength(contentLength);

    if (contentLength > totalCharacters) {
      onChangeCharacterExceed(true);
    } else {
      onChangeCharacterExceed(false);
    }

    const newParagraphs = handleEditParagraphs(paragraphs, newEditorState);
    dispatch(actions.synthesisRequest.updateParagraphs(newParagraphs));

    const selectionState = handleSelection(newEditorState);
    if (selectionState) {
      setEditorState(
        EditorState.forceSelection(newEditorState, selectionState),
      );

      const { selectedText, selectedParagraph } = handleSelectedParagraph(
        selectionState,
        contentState,
      );
      dispatch(
        actions.synthesisRequest.updateSelectedParagraph(selectedParagraph),
      );
      onchangeSynthesisSentence(selectedText);
    } else {
      setEditorState(newEditorState);
    }
  };

  const handleBlurEditor = () => {
    dispatch(actions.synthesisRequest.updateSelectedParagraph([]));
  };

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
            editorState={editorState}
            onChange={handleChangeEditorState}
            customStyleMap={StyledMapEditor}
            placeholder={`${t('enterTextHere')}...`}
            stripPastedStyles
            onBlur={handleBlurEditor}
          />
        </div>
      )}
    </StyledContent>
  );
};

export default Content;
