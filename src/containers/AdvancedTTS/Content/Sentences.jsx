import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from '@src/redux/actions';
// import { useTranslation } from 'react-i18next';
// import { Checkbox, FormControlLabel } from '@mui/material';
import SentenceItem from './SentenceItem';
import { StyledSentences } from './index.style';

const Sentences = ({
  sentences,
  characterExceed,
  onChangeSentences,
  onChangeInputLength,
  onChangeCharacterExceed,
  onTryListeningSentence,
}) => {
  const [selectedList, setSelectedList] = useState([]);

  const dispatch = useDispatch();
  // const { t } = useTranslation();

  // const isAllSelected = () => selectedList.length === sentences.length;

  // const isIndeterminate = () =>
  //   selectedList.length > 0 && selectedList.length < sentences.length;

  // const handleSelectAllClick = (e) => {
  //   if (e.target.checked) {
  //     const newSelected = sentences.map((sentence) => sentence.id);
  //     setSelectedList(newSelected);
  //     return;
  //   }
  //   setSelectedList([]);
  // };

  const handleChangeSentenceItem = (sentenceId, name, value) => {
    dispatch(
      actions.audioPlayer.updateTryListeningSentence({
        sentenceId: '',
        sentenceAudioLink: '',
      }),
    );
    const newSentences = sentences.map((item) =>
      item.id === sentenceId
        ? { ...item, [name]: value, onLoad: false }
        : { ...item, onLoad: false },
    );
    onChangeSentences(newSentences);
  };

  return (
    <StyledSentences>
      {/* <FormControlLabel
        label={t('selectAll')}
        control={
          <Checkbox
            checked={isAllSelected()}
            indeterminate={isIndeterminate()}
            onChange={handleSelectAllClick}
            classes={{ root: 'check-box-all' }}
          />
        }
      /> */}
      {sentences.map((sentenceItem) => {
        const isSelected = selectedList.includes(sentenceItem.id);
        return (
          <SentenceItem
            key={sentenceItem.id}
            sentence={sentenceItem}
            characterExceed={characterExceed}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
            isSelected={isSelected}
            sentences={sentences}
            onChangeInputLength={onChangeInputLength}
            onChangeSentenceItem={handleChangeSentenceItem}
            onChangeCharacterExceed={onChangeCharacterExceed}
            onTryListeningSentence={onTryListeningSentence}
            onChangeSentences={onChangeSentences}
          />
        );
      })}
    </StyledSentences>
  );
};

export default Sentences;
