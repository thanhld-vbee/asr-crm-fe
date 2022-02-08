import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import actions from '@src/redux/actions';

import {
  Editor,
  EditorState,
  ContentState,
  getDefaultKeyBinding,
} from 'draft-js';
import {
  //  Checkbox,
  Typography,
  Stack,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Pause, PlayArrowOutlined } from '@mui/icons-material';
import BadgeAvatar from '@src/components/BadgeAvatar';
import BreakTime from '@src/components/BreakTime';
import Speed from '@src/components/Speed';
import { onHandleKeyCommand } from '@src/services/sentence';
import classNames from 'classnames';
import VoicesDialog from '../VoicesDialog';
import { StyledSentenceItem } from './index.style';

const SentenceItem = ({
  sentence,
  // isSelected,
  // selectedList,
  characterExceed,
  sentences,
  onChangeInputLength,
  // setSelectedList,
  onChangeSentenceItem,
  onChangeCharacterExceed,
  onTryListeningSentence,
  onChangeSentences,
}) => {
  const [content, setContent] = useState(EditorState.createEmpty());
  const [openVoices, setOpenVoices] = useState(false);

  const {
    isAudioLoading,
    sentenceId,
    isPlaying,
    audioLink,
    sentenceAudioLink,
    duration,
  } = useSelector((state) => state.audioPlayer);

  const { usingPackage } = useSelector((state) => state.user);

  const totalCharacters = usingPackage?.maxLengthInputText || 0;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleOpenVoices = () => setOpenVoices(true);
  const handleCloseVoices = () => setOpenVoices(false);

  const handleChangeVoice = (voice) => {
    onChangeSentenceItem(sentence.id, 'voice', voice);
    handleCloseVoices();
  };

  // const handleCheckbox = (e) => {
  //   const sentenceId = sentence.id;
  //   let newSelected = [];

  //   if (e.target.checked) {
  //     newSelected = [...selectedList, sentenceId];
  //   } else {
  //     newSelected = selectedList.filter((item) => item !== sentenceId);
  //   }
  //   setSelectedList(newSelected);
  // };

  const calTotalCharactersExcludingCurrSentence = () => {
    const checkValidSentence = (sentenceItem) =>
      sentenceItem.text && sentenceItem.id !== sentence.id;

    return sentences.reduce(
      (sum, item) => (checkValidSentence(item) ? sum + item.text.length : sum),
      0,
    );
  };

  const handleEditorChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText('\n');

    const totalInputLength =
      calTotalCharactersExcludingCurrSentence() + text.length;

    onChangeInputLength(totalInputLength);
    setContent(editorState);
    onChangeSentenceItem(sentence.id, 'text', text);

    if (totalInputLength > totalCharacters) {
      onChangeCharacterExceed(true);
    } else {
      onChangeCharacterExceed(false);
    }
  };

  const handleKeyCommand = (command) =>
    onHandleKeyCommand({
      content,
      command,
      sentence,
      sentences,
      onChangeSentences,
    });

  const myKeyBindingFn = (e) => {
    if (e.keyCode === 13) {
      return 'enter_command';
    }
    return getDefaultKeyBinding(e);
  };

  const handleChangeBreakTime = (value) => {
    onChangeSentenceItem(sentence.id, 'breakTime', value);
  };

  const handleChangeSpeed = (name, value) =>
    onChangeSentenceItem(sentence.id, name, value);

  const handleTryListening = () => {
    if (
      sentenceId === sentence.id &&
      sentenceAudioLink &&
      sentenceAudioLink === audioLink
    ) {
      dispatch(actions.audioPlayer.updateStatus(!isPlaying));
      return;
    }

    if (
      sentenceId === sentence.id &&
      sentenceAudioLink &&
      sentenceAudioLink !== audioLink
    ) {
      dispatch(actions.audioPlayer.updateAudioLink(sentenceAudioLink));
      dispatch(actions.audioPlayer.updateStatus(true));
      dispatch(
        actions.audioPlayer.updateMetaData({ currentTime: 0, duration: 0 }),
      );
      return;
    }
    onTryListeningSentence(sentence);
  };

  const isShowLoading =
    (isAudioLoading || (isPlaying && !duration)) && sentenceId === sentence.id;

  const isShowPlaying =
    sentenceId === sentence.id &&
    sentenceAudioLink === audioLink &&
    isPlaying &&
    !!duration &&
    !isAudioLoading;

  useEffect(() => {
    if (sentence.text) {
      const contentEditor = EditorState.createWithContent(
        ContentState.createFromText(sentence.text),
      );
      setContent(contentEditor);
    }
  }, []);

  useEffect(() => {
    if (sentence.onLoad) {
      const contentEditor = EditorState.createWithContent(
        ContentState.createFromText(sentence.text),
      );
      if (sentence.mousePointerPosition !== undefined) {
        const selection = contentEditor.getSelection().merge({
          anchorOffset: sentence.mousePointerPosition,
          focusOffset: sentence.mousePointerPosition,
        });
        setContent(EditorState.forceSelection(contentEditor, selection));
        onChangeSentenceItem(sentence.id, 'mousePointerPosition', undefined);
      } else {
        setContent(contentEditor);
      }
    }
  }, [sentence.onLoad, sentence.mousePointerPosition]);

  return (
    <StyledSentenceItem>
      {/* <Checkbox
        checked={isSelected}
        onChange={handleCheckbox}
        classes={{ root: 'check-box' }}
      /> */}
      <BreakTime
        currentBreakTime={sentence.breakTime}
        onChange={handleChangeBreakTime}
        disabled={isShowLoading}
        isSentence
      />
      <Speed
        currentSpeed={sentence.speed}
        onChange={handleChangeSpeed}
        disabled={isShowLoading}
        isSentence
      />
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        className="voice-info"
        onClick={!isShowLoading && handleOpenVoices}
      >
        <BadgeAvatar
          img={sentence.voice && sentence.voice.roundImage}
          smallImg={
            sentence.voice &&
            sentence.voice.language &&
            sentence.voice.language.roundImage
          }
          type="image"
        />
        <Typography variant="body2">
          {sentence.voice && sentence.voice.name}
        </Typography>
      </Stack>
      <IconButton
        disabled={!sentence.text || isShowLoading}
        onClick={handleTryListening}
        className="play-audio"
      >
        {isShowLoading && (
          <CircularProgress size={15} thickness={8} className="loading" />
        )}
        {isShowPlaying && <Pause />}
        {!isShowLoading && !isShowPlaying && <PlayArrowOutlined />}
      </IconButton>
      <div
        className={classNames('editor-container', {
          'character-exceed': characterExceed,
        })}
      >
        <Editor
          placeholder={t('enterNewSentenceHere')}
          editorState={content}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={myKeyBindingFn}
          onChange={handleEditorChange}
          stripPastedStyles
        />
      </div>
      <VoicesDialog
        open={openVoices}
        activeVoiceId={sentence.voice && sentence.voice.id}
        onClose={handleCloseVoices}
        onChangeVoice={handleChangeVoice}
      />
    </StyledSentenceItem>
  );
};

export default SentenceItem;
