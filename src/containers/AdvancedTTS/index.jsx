import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import camelcaseKeys from 'camelcase-keys';
import { EditorState, ContentState } from 'draft-js';
import {
  LANGUAGE_CODE,
  REQUEST_STATUS,
  MAX_TRY_LISTENING_CHARACTERS,
  BREAK_TIME_REGEX,
  DEFAULT_SYNTHESIS_REQUEST,
} from '@src/constants/voice';
import { WS_TYPE, PING_INTERVAL } from '@src/constants/websocket';
import { TTS_SYNTHESIS_URL } from '@src/configs';
import {
  splitParagraphIntoSentence,
  getSentencesPayload,
  countTextLength,
  checkValidXml,
} from '@src/services/tts';

import Card from '@src/components/Card';
import { Divider, Typography, Button } from '@mui/material';
import arrowIconDown from '@src/assets/icons/arrow-icon-down.png';

import ConfirmDialog from '@src/components/Dialog/ConfirmDialog';
import apis from '@src/apis';
import actions from '@src/redux/actions';
import { generateDecorator } from '@src/services/sentence';

import NotificationDialog from '@src/components/NotificationDialog';
import ImportToolbar from './ImportToolbar';
import ProcessingMethods from './ProcessingMethods';
import TitleBar from './TitleBar';
import Toolbar from './Toolbar';
import Content from './Content';
import ConvertAction from './ConvertAction';
import TTSDemo from './TTSDemo';
import Requests from './Requests';
import VoicesDialog from './VoicesDialog';
import BreakTimeHighlight from './BreakTimeHightLight';

import { StyledTTS } from './index.style';

const TTS = () => {
  const [synthesisSentence, setSynthesisSentence] = useState('');

  const [openSentences, setOpenSentences] = useState(false);
  const [openVoices, setOpenVoices] = useState(false);
  const [content, setContent] = useState(
    EditorState.createEmpty(
      generateDecorator(BREAK_TIME_REGEX, BreakTimeHighlight),
    ),
  );
  const [voice, setVoice] = useState();
  const [inputLength, setInputLength] = useState(0);
  const [sentences, setSentences] = useState([]);
  const [openRequest, setOpenRequest] = useState(false);
  const [characterExceed, setCharacterExceed] = useState(false);
  const [confirmSwitchParagraph, setConfirmSwitchParagraph] = useState(false);
  const [isSSML, setIsSSML] = useState(false);
  const [openSSMLDialog, setOpenSSMLDialog] = useState(false);

  const [requestLoading, setRequestLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openExceedCharactersDialog, setOpenExceedCharactersDialog] =
    useState(false);
  const { isPlaying } = useSelector((state) => state.audioPlayer);
  const { synthesisRequest } = useSelector((state) => state.synthesisRequest);
  const { usingPackage } = useSelector((state) => state.user);
  const { accessToken } = useSelector((state) => state.auth);

  const totalCharacters = usingPackage?.maxLengthInputText || 0;

  const { t } = useTranslation();
  const ws = useRef(null);
  const currentIsPlayingAudio = useRef(null);
  const accessTokenRef = useRef(accessToken);
  const dispatch = useDispatch();

  const handleOpenVoices = (value) => setOpenVoices(value);
  const handleCloseVoices = () => setOpenVoices(false);
  const handleChangeContent = (value) => setContent(value);
  const handleChangeInputLength = (value) => setInputLength(value);
  const handleChangeSentences = (value) => setSentences(value);
  const handleOpenRequest = (value) => setOpenRequest(value);
  const handleChangeCharacterExceed = (value) => setCharacterExceed(value);
  const handleChangeRequestLoading = (value) => setRequestLoading(value);
  const handleChangeSynthesisSentence = (value) => setSynthesisSentence(value);
  const handleChangeOpenSentences = (value) => setOpenSentences(value);

  const handleChangeVoice = (value) => setVoice(value);
  const handleChangeIsSSML = (value) => setIsSSML(value);

  const handleUploadContent = (text) => {
    const contentEditor = EditorState.createWithContent(
      ContentState.createFromText(text),
    );

    setContent(EditorState.moveFocusToEnd(contentEditor));
    const newSentences = splitParagraphIntoSentence(text, voice);
    setSentences(newSentences);

    const textLength = text.length;
    setInputLength(textLength);

    if (textLength > totalCharacters) setCharacterExceed(true);
  };

  const handleCloseExceedCharactersDialog = () => {
    setOpenExceedCharactersDialog(false);
  };

  const handleOpenSentences = (checkedSwitch) => {
    if (checkedSwitch) {
      setOpenSentences(checkedSwitch);
      const plainTextContent = content.getCurrentContent().getPlainText('\n');
      const newSentences = splitParagraphIntoSentence(plainTextContent, voice);
      setSentences(newSentences);
    } else {
      setConfirmSwitchParagraph(true);
    }
  };

  const handleCloseConfirmDialog = () => setConfirmSwitchParagraph(false);
  const handleCloseSSMLDialog = () => setOpenSSMLDialog(false);

  const handleAcceptConfirmDialog = () => {
    setOpenSentences(false);
    setConfirmSwitchParagraph(false);
    const sentencesText = sentences.map((item) => item.text);

    const paragraphText = sentencesText.join('\n');
    const paragraphEditorStyle = EditorState.createWithContent(
      ContentState.createFromText(paragraphText),
    );
    setContent(paragraphEditorStyle);
  };

  const handleTryListeningSentence = (sentence) => {
    const { id: sentenceId, text, voice: sentenceVoice, speed } = sentence;
    if (!text || !text.trim()) return;

    dispatch(actions.audioPlayer.updateAudioLink(''));
    dispatch(actions.audioPlayer.updateStatus(false));
    dispatch(
      actions.audioPlayer.updateMetaData({ currentTime: 0, duration: 0 }),
    );

    const countLength = countTextLength(text);
    if (countLength > MAX_TRY_LISTENING_CHARACTERS) {
      dispatch(
        actions.noti.push({
          severity: 'warning',
          message: 'warningListening',
          value: MAX_TRY_LISTENING_CHARACTERS,
        }),
      );
      return;
    }

    dispatch(
      actions.audioPlayer.updateTryListeningSentence({
        isAudioLoading: true,
        sentenceId,
      }),
    );

    const { audioType, bitrate, backgroundMusic, volume } = synthesisRequest;
    const bitrateOfBps = bitrate * 1000;

    const payload = {
      text,
      voiceCode: sentenceVoice?.code,
      speed,
      audioType,
      bitrate: bitrateOfBps,
      volume,
    };

    const hasBackgroundMusic =
      backgroundMusic && Object.keys(backgroundMusic).length;
    if (hasBackgroundMusic) {
      const { link, name, volume: bgVolume } = backgroundMusic;
      payload.backgroundMusic = { link, name, volume: bgVolume };
    }

    ws.current.send(JSON.stringify({ type: WS_TYPE.SYNTHESIS, payload }));
  };

  const handleCreateSynthesis = async () => {
    const { title, audioType, bitrate, backgroundMusic, volume } =
      synthesisRequest;
    const bitrateOfBps = bitrate * 1000;

    let synthesisPayload = { audioType, bitrate: bitrateOfBps, volume };
    if (title) synthesisPayload.title = title;

    const hasBackgroundMusic =
      backgroundMusic && Object.keys(backgroundMusic).length;
    if (hasBackgroundMusic) {
      const { link, name, volume: bgVolume } = backgroundMusic;
      synthesisPayload.backgroundMusic = { link, name, volume: bgVolume };
    }

    if (openSentences) {
      const sentencesPayload = getSentencesPayload(sentences, totalCharacters);
      if (!sentencesPayload) {
        setOpenExceedCharactersDialog(true);
        return;
      }

      synthesisPayload = { ...synthesisPayload, sentences: sentencesPayload };
    } else {
      const text = content.getCurrentContent().getPlainText('\n');

      if (isSSML) {
        if (checkValidXml(text)) {
          // TODO: map ssml to payload before call api
        } else setOpenSSMLDialog(true);
        return;
      }
      const contentLength = countTextLength(text);
      if (contentLength === 0 || contentLength > totalCharacters) {
        setOpenExceedCharactersDialog(true);
        return;
      }

      synthesisPayload = {
        ...synthesisPayload,
        text,
        voiceCode: voice?.code,
        speed: Number(synthesisRequest.speed),
      };
    }
    setLoading(true);
    const data = await apis.synthesis.createSynthesis(synthesisPayload);
    setLoading(false);
    if (data?.status) {
      // setContent(EditorState.createEmpty());
      // dispatch(actions.synthesisRequest.updateSynthesisRequest('title', ''));
      handleChangeRequestLoading(true);
    }
  };

  const fetchVoicesByViLanguage = async () => {
    const data = await apis.voices.getVoices({
      languageCode: LANGUAGE_CODE.VIETNAMESE,
    });
    if (data.result) {
      const vietnameseVoices = data.result.voices;
      if (vietnameseVoices.length) setVoice(vietnameseVoices[0]);
    }
  };

  useEffect(() => {
    fetchVoicesByViLanguage();
    dispatch(
      actions.synthesisRequest.updateSynthesisConfig(DEFAULT_SYNTHESIS_REQUEST),
    );
  }, []);

  useEffect(() => {
    currentIsPlayingAudio.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  useEffect(() => {
    ws.current = new WebSocket(TTS_SYNTHESIS_URL);
    let pingInterval;
    ws.current.onopen = () => {
      ws.current.send(
        JSON.stringify({
          type: WS_TYPE.INIT,
          accessToken: accessTokenRef.current,
        }),
      );
      pingInterval = setInterval(() => {
        ws.current.send(JSON.stringify({ type: WS_TYPE.PING }));
      }, PING_INTERVAL);
    };

    const handleTryListeningError = () => {
      const failurePayload = { sentenceId: '', isAudioLoading: false };
      dispatch(actions.audioPlayer.updateTryListeningSentence(failurePayload));
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'listeningError',
        }),
      );
    };

    ws.current.onmessage = (res) => {
      const responseData = camelcaseKeys(JSON.parse(res.data), { deep: true });
      const { type, result, status } = responseData;

      if (status === 0) handleTryListeningError();

      if (type === WS_TYPE.SYNTHESIS) {
        switch (result && result.status) {
          case REQUEST_STATUS.IN_PROGRESS: {
            break;
          }
          case REQUEST_STATUS.SUCCESS: {
            if (currentIsPlayingAudio.current) {
              const cancelPayload = { sentenceId: '', isAudioLoading: false };
              dispatch(
                actions.audioPlayer.updateTryListeningSentence(cancelPayload),
              );
            } else {
              const audioLink = result?.audioLink;
              dispatch(actions.audioPlayer.updateAudioLink(audioLink, true));
              dispatch(
                actions.audioPlayer.updateTryListeningSentence({ audioLink }),
              );
              dispatch(actions.audioPlayer.updateStatus(true));
            }
            break;
          }
          case REQUEST_STATUS.FAILURE: {
            handleTryListeningError();
            break;
          }
          default:
            break;
        }
      }
    };

    ws.current.onclose = () => {
      // eslint-disable-next-line no-console
      console.log('Websocket is closed.');
      clearInterval(pingInterval);
    };
  }, []);

  const renderExceedCharactersDialogAction = () => (
    <Button variant="contained" onClick={handleCloseExceedCharactersDialog}>
      {t('understood')}
    </Button>
  );

  const renderWrongSSMLDialogAction = () => (
    <Button variant="contained" onClick={handleCloseSSMLDialog}>
      {t('understood')}
    </Button>
  );

  return (
    <StyledTTS openRequest={openRequest}>
      <div className="tts">
        <div className="action-header">
          <ImportToolbar onHandleUploadContent={handleUploadContent} />
          <ProcessingMethods
            isSSML={isSSML}
            openSentences={openSentences}
            onOpenSentences={handleOpenSentences}
          />
        </div>
        <Card flexDirection="column" padding="10px" margin="25px 0">
          <TitleBar voice={voice} onOpenVoice={handleOpenVoices} />
          <Divider />
          <Toolbar
            content={content}
            openSentences={openSentences}
            isSSML={isSSML}
            handleChangeIsSSML={handleChangeIsSSML}
            handleChangeContent={handleChangeContent}
          />
          <Divider />
          <Content
            openSentences={openSentences}
            sentences={sentences}
            content={content}
            characterExceed={characterExceed}
            onChangeContent={handleChangeContent}
            onChangeInputLength={handleChangeInputLength}
            onChangeSentences={handleChangeSentences}
            onChangeCharacterExceed={handleChangeCharacterExceed}
            onchangeSynthesisSentence={handleChangeSynthesisSentence}
            onTryListeningSentence={handleTryListeningSentence}
            onChangeOpenSentences={handleChangeOpenSentences}
            onChangeVoice={handleChangeVoice}
          />
          <Divider />
          <ConvertAction
            voice={voice}
            loading={loading}
            synthesisRequest={synthesisRequest}
            synthesisSentence={synthesisSentence}
            openSentences={openSentences}
            inputLength={inputLength}
            characterExceed={characterExceed}
            onCreateSynthesis={handleCreateSynthesis}
            onTryListeningSentence={handleTryListeningSentence}
          />
          <VoicesDialog
            open={openVoices}
            activeVoiceId={voice && voice.id}
            onClose={handleCloseVoices}
            onChangeVoice={handleChangeVoice}
          />
        </Card>
        <TTSDemo />
        <div className="scroll-wrapper">
          <Typography
            variant="subtitle2"
            color="error"
            className="opacity-none"
          >
            *{t('note')}: {t('audioStorageNote')}
          </Typography>
          <div className="align-center">
            <Button
              variant="contained"
              className="transition-btn"
              onClick={() => handleOpenRequest(true)}
            >
              {t('ttsHistory')} <img src={arrowIconDown} alt="icon" />
            </Button>
          </div>
        </div>
      </div>
      <div className="request">
        <Requests
          openRequest={openRequest}
          requestLoading={requestLoading}
          handleOpenRequest={handleOpenRequest}
          onChangeRequestLoading={handleChangeRequestLoading}
        />
      </div>

      <ConfirmDialog
        title={t('confirmSwitchProcessingMethod')}
        content={t('switchProcessingMethodNote')}
        open={confirmSwitchParagraph}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleAcceptConfirmDialog}
      />

      <NotificationDialog
        name="ssml"
        title={t('convertTTSBySSML')}
        description={t('inValidSSML')}
        variant="warning"
        open={openSSMLDialog}
        onClose={handleCloseSSMLDialog}
        actionComponent={renderWrongSSMLDialogAction()}
      />

      <NotificationDialog
        name="exceed characters"
        title={t('exceedCharacters')}
        description={t('exceedCharactersDescription', { totalCharacters })}
        variant="warning"
        open={openExceedCharactersDialog}
        onClose={handleCloseExceedCharactersDialog}
        actionComponent={renderExceedCharactersDialogAction()}
      />
    </StyledTTS>
  );
};
export default TTS;
