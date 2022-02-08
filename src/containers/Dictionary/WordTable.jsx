import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, TextField, Typography } from '@mui/material';
import { Delete, Edit, Check, Close } from '@mui/icons-material';
import Table from '@src/components/Table';
import { PAGINATION_LIMIT } from '@src/constants';
import {
  checkValidateWord,
  checkValidatePronunciation,
} from '@src/services/dictionary';
import { StyledWordTable } from './index.style';

const WordTable = ({
  words,
  loading,
  total,
  page,
  selected,
  onChangePage,
  onChangeSelected,
  onChangeWords,
  onChangeTotal,
  onChangeReset,
}) => {
  const [errorPronunciation, setErrorPronunciation] = useState(false);
  const [errorWord, setErrorWord] = useState(false);

  const { t } = useTranslation();

  const handleChangeWord = (e) => {
    setErrorWord(false);
    const { value } = e.target;
    const newSelected = { ...selected, word: value };
    onChangeSelected(newSelected);
    if (!checkValidateWord(words, value)) setErrorWord(true);
  };

  const handleChangePronunciation = (e) => {
    setErrorPronunciation(false);
    const { value } = e.target;
    const newSelected = { ...selected, pronunciation: value };
    onChangeSelected(newSelected);
  };

  const handleComplete = () => {
    const { word, pronunciation } = selected;
    if (selected.id && !checkValidateWord(words, word)) {
      setErrorWord(true);
      return;
    }

    if (!checkValidatePronunciation(pronunciation)) {
      setErrorPronunciation(true);
      return;
    }

    let newWords;
    if (selected.id) {
      newWords = words.map((item) =>
        item.id === selected.id ? { word, pronunciation } : item,
      );
    } else {
      newWords = words.map((item) =>
        item.word === selected.word ? { ...item, pronunciation } : item,
      );
    }
    onChangeWords(newWords);
    onChangeSelected({});
  };

  const handleCancel = () => {
    if (selected.id) {
      const newWords = words.filter((item) => item.id !== selected.id);
      onChangeWords(newWords);
      onChangeTotal(newWords.length);
    }
    setErrorWord(false);
    setErrorPronunciation(false);
    onChangeSelected({});
  };

  const handleEdit = (row) => {
    onChangeReset();
    onChangeSelected(row);
  };

  const handleDelete = (row) => {
    const newWords = words.filter((item) => item.word !== row.word);
    onChangeWords(newWords);
    onChangeTotal(newWords.length);
  };

  const validCreate = (id) => selected.id && selected.id === id;
  const validEdit = (word) => !selected.id && selected.word === word;

  const renderAction = (row) => {
    if (validCreate(row.id) || validEdit(row.word)) {
      return (
        <div className="actions">
          <IconButton className="icon-button" onClick={handleComplete}>
            <Check color="success" />
          </IconButton>
          <IconButton className="icon-button" onClick={handleCancel}>
            <Close />
          </IconButton>
        </div>
      );
    }
    return (
      <div className="actions">
        <IconButton className="icon-button" onClick={() => handleEdit(row)}>
          <Edit />
        </IconButton>
        <IconButton className="icon-button" onClick={() => handleDelete(row)}>
          <Delete color="error" />
        </IconButton>
      </div>
    );
  };

  const renderPronunciation = (row) => {
    if (validCreate(row.id) || validEdit(row.word)) {
      return (
        <TextField
          variant="standard"
          name="pronunciation"
          value={selected.pronunciation}
          onChange={handleChangePronunciation}
          error={errorPronunciation}
          helperText={
            errorPronunciation && t('invalidPronunciationOfDictionary')
          }
          placeholder={t('examplePronunciation')}
        />
      );
    }
    return <Typography variant="body2">{row.pronunciation}</Typography>;
  };

  const renderWord = (row) => {
    if (validCreate(row.id)) {
      return (
        <TextField
          fullWidth
          variant="standard"
          name="word"
          value={selected.word}
          onChange={handleChangeWord}
          error={errorWord}
          helperText={errorWord && t('invalidWordOfDictionary')}
        />
      );
    }
    return <Typography variant="body2">{row.word}</Typography>;
  };

  const columns = [
    {
      field: 'word',
      title: t('content'),
      sortable: false,
      align: 'left',
      render: (row) => renderWord(row),
    },
    {
      field: 'pronunciation',
      title: t('pronunciation'),
      sortable: false,
      align: 'left',
      render: (row) => renderPronunciation(row),
    },
    {
      field: 'action',
      title: '',
      sortable: false,
      align: 'center',
      render: (row) => renderAction(row),
    },
  ];

  return (
    <StyledWordTable>
      <Table
        loading={loading}
        columns={columns}
        data={words.slice(
          (page - 1) * PAGINATION_LIMIT,
          page * PAGINATION_LIMIT,
        )}
        page={page}
        total={total}
        onChangePage={onChangePage}
      />
    </StyledWordTable>
  );
};

export default WordTable;
