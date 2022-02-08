import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AUDIO_TYPE, BITRATE } from '@src/constants/voice';
import {
  EditorState,
  CompositeDecorator,
  Modifier,
  SelectionState,
} from 'draft-js';
import { OrderedSet } from 'immutable';
import musicImg from '@src/assets/images/music.png';
import dictionaryImg from '@src/assets/images/dictionary.png';
// import micImg from '@src/assets/images/mic.png';
import radioImg from '@src/assets/images/radio.png';
import {
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search,
  FindReplace,
  LocalOfferOutlined,
  VolumeDownOutlined,
  Undo,
  Redo,
  Code,
} from '@mui/icons-material';
import BreakTime from '@src/components/BreakTime';
import Speed from '@src/components/Speed';
import Volume from '@src/components/Volume';
import BackgroundMusic from '@src/containers/BackgroundMusic';
import Dictionary from '@src/containers/Dictionary';
import actions from '@src/redux/actions';
import classNames from 'classnames';
import Feature from '@src/components/Feature';
import FEATURE_FLAG from '@src/constants/featureFlags.json';
import AdjustmentButton from './AdjustmentButton';
import { StyledToolbar } from './index.style';

const Toolbar = ({
  content,
  isSSML,
  handleChangeIsSSML,
  openSentences,
  handleChangeContent,
}) => {
  const [search, setSearch] = useState('');
  const [replace, setReplace] = useState('');
  const [openMusic, setOpenMusic] = useState(false);
  const [openDictionary, setOpenDictionary] = useState(false);
  const { synthesisRequest } = useSelector((state) => state.synthesisRequest);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArr = regex.exec(text);
    let start;
    let end;

    while (matchArr !== null) {
      start = matchArr.index;
      end = start + matchArr[0].length;
      callback(start, end);
      matchArr = regex.exec(text);
    }
  };

  const SearchHighlight = ({ children }) => (
    <span className="search-highlight">{children}</span>
  );

  const generateDecorator = (highlightTerm) => {
    const regex = new RegExp(highlightTerm, 'gi');
    return new CompositeDecorator([
      {
        strategy: (contentBlock, callback) => {
          if (highlightTerm !== '')
            findWithRegex(regex, contentBlock, callback);
        },
        component: SearchHighlight,
      },
    ]);
  };

  const handleChangeSearch = (e) => {
    e.persist();
    setSearch(e.target.value);
    const stateContent = EditorState.set(content, {
      decorator: generateDecorator(e.target.value),
    });
    handleChangeContent(stateContent);
  };

  const handleReplace = () => {
    if (!search || !replace) return;
    const regex = new RegExp(search, 'gi');
    const selectionsToReplace = [];
    const blockMap = content.getCurrentContent().getBlockMap();
    const delta = replace.length - search.length;
    let blockIndex = 0;
    let currentBlockKey = '';
    blockMap.forEach((contentBlock) =>
      findWithRegex(regex, contentBlock, (start, end) => {
        const blockKey = contentBlock.getKey();
        if (currentBlockKey !== blockKey) {
          blockIndex = 0;
          currentBlockKey = blockKey;
        }
        const blockSelection = SelectionState.createEmpty(blockKey).merge({
          anchorOffset: start + blockIndex * delta,
          focusOffset: end + blockIndex * delta,
        });
        blockIndex += 1;
        selectionsToReplace.push(blockSelection);
      }),
    );

    let contentState = content.getCurrentContent();

    selectionsToReplace.forEach((selectionState) => {
      contentState = Modifier.replaceText(
        contentState,
        selectionState,
        replace,
      );
    });
    handleChangeContent(EditorState.push(content, contentState));
  };

  const handleKeyDownReplace = (event) => {
    if (event.key === 'Enter') handleReplace();
  };

  const handleOpenMusic = () => setOpenMusic(true);
  const handleCloseMusic = () => setOpenMusic(false);

  const handleOpenDictionary = () => setOpenDictionary(true);
  const handleCloseDictionary = () => setOpenDictionary(false);

  const handleUndoContent = () =>
    handleChangeContent(EditorState.undo(content));

  const handleRedoContent = () =>
    handleChangeContent(EditorState.redo(content));

  const handleChangeSynthesisRequest = (name, value) =>
    dispatch(actions.synthesisRequest.updateSynthesisRequest(name, value));

  const handleChangeBreakTime = (value) => {
    handleChangeSynthesisRequest('breakTime', value);
    const currentContent = content.getCurrentContent();
    const selection = content.getSelection();
    const label = `<break time=${value}s/>`;

    const textWithEntity = Modifier.insertText(
      currentContent,
      selection,
      label,
      OrderedSet.of('BOLD'),
    );
    handleChangeContent(
      EditorState.push(content, textWithEntity, 'insert-characters'),
    );
  };

  const handleChangeBackgroundMusic = (name, link) =>
    dispatch(actions.synthesisRequest.updateBackgroundMusic(name, link));

  const handleChangeVolumeBackgroundMusic = (value) =>
    dispatch(actions.synthesisRequest.updateVolumeBackgroundMusic(value));

  return (
    <StyledToolbar>
      <div className="action">
        <div
          className={classNames('button-wrapper', {
            disabled: content.getUndoStack().isEmpty(),
          })}
        >
          <IconButton
            className="action-icon-button"
            onClick={handleUndoContent}
            disabled={content.getUndoStack().isEmpty()}
          >
            <Undo />
          </IconButton>
        </div>
      </div>
      <div className="action border-right">
        <div
          className={classNames('button-wrapper redo-button', {
            disabled: content.getRedoStack().isEmpty(),
          })}
        >
          <IconButton
            className="action-icon-button"
            onClick={handleRedoContent}
            disabled={content.getRedoStack().isEmpty()}
          >
            <Redo />
          </IconButton>
        </div>
      </div>
      <div className="action">
        <TextField
          name="search"
          variant="standard"
          className="search-input"
          placeholder={t('search')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          value={search}
          onChange={handleChangeSearch}
        />
      </div>
      <div className="action border-right">
        <TextField
          name="search"
          variant="standard"
          className="search-input replace-input"
          placeholder={t('replace')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FindReplace className="icon" onClick={handleReplace} />
              </InputAdornment>
            ),
          }}
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
          onKeyDown={handleKeyDownReplace}
        />
      </div>
      <Feature name={FEATURE_FLAG.SSML}>
        <div className="action border-right">
          <div
            className={classNames('custom-button', { active: isSSML })}
            role="presentation"
            onClick={() => handleChangeIsSSML(!isSSML)}
          >
            <Code />
            <Typography variant="body2" className="button-text">
              {t('ssml')}
            </Typography>
          </div>
        </div>
      </Feature>
      <div className="action border-right">
        <div
          className="custom-button"
          role="presentation"
          onClick={handleOpenDictionary}
        >
          <img src={dictionaryImg} alt="audio-format" className="button-img" />
          <Typography variant="body2" className="button-text">
            {t('dictionary')}
          </Typography>
        </div>
      </div>
      <div className="action">
        <Tooltip
          title={synthesisRequest.backgroundMusic?.name || ''}
          placement="top-start"
        >
          <div
            className={classNames('custom-button', {
              active: synthesisRequest.backgroundMusic?.link,
            })}
            role="presentation"
            onClick={handleOpenMusic}
          >
            <img src={musicImg} alt="audio-format" className="button-img" />
            <Typography variant="body2" className="button-text">
              {t('backgroundMusic')}
            </Typography>
          </div>
        </Tooltip>
      </div>
      <div className="action border-right">
        <Volume
          active={
            synthesisRequest.backgroundMusic?.link &&
            synthesisRequest.backgroundMusic?.volume !== 0
          }
          disabled={!synthesisRequest.backgroundMusic?.link}
          volume={synthesisRequest.backgroundMusic?.volume || 0}
          text={t('backgroundMusicVolume')}
          icon={<VolumeDownOutlined />}
          max={100}
          width="200px"
          onChange={(value) => handleChangeVolumeBackgroundMusic(value)}
        />
      </div>
      <div className="action border-right">
        <AdjustmentButton
          value={synthesisRequest.audioType}
          name="audioType"
          icon={radioImg}
          options={AUDIO_TYPE}
          onChange={handleChangeSynthesisRequest}
        />
      </div>
      <div className="action border-right">
        <AdjustmentButton
          value={synthesisRequest.bitrate}
          name="bitrate"
          text="kbps"
          icon={<LocalOfferOutlined fontSize="small" />}
          options={BITRATE}
          width="95px"
          onChange={handleChangeSynthesisRequest}
        />
      </div>
      <div className="action">
        <Speed
          currentSpeed={synthesisRequest.speed}
          disabled={openSentences || isSSML}
          onChange={handleChangeSynthesisRequest}
        />
      </div>
      {/* <div className="action">
        <Volume
          volume={synthesisRequest.volume}
          text={t('volume')}
          icon={micImg}
          max={200}
          onChange={(value) => handleChangeSynthesisRequest('volume', value)}
        />
        </div> */}
      <div className="action border-right">
        <BreakTime
          currentBreakTime={synthesisRequest.breakTime}
          disabled={openSentences || isSSML}
          onChange={handleChangeBreakTime}
        />
      </div>
      <BackgroundMusic
        open={openMusic}
        currentBackgroundMusic={synthesisRequest.backgroundMusic}
        name="backgroundMusic"
        onClose={handleCloseMusic}
        onChange={handleChangeBackgroundMusic}
      />
      <Dictionary open={openDictionary} onClose={handleCloseDictionary} />
    </StyledToolbar>
  );
};

export default Toolbar;
