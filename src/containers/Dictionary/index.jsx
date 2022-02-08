import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from '@src/redux/actions';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import Dialog from '@src/components/Dialog';
import apis from '@src/apis';
import WordTable from './WordTable';

import { StyleDictionary } from './index.style';

const Dictionary = ({ open, onClose }) => {
  const [words, setWords] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({});

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleChangePage = (newPage) => setPage(newPage);
  const handleChangeTotal = (value) => setTotal(value);
  const handleChangeSelected = (value) => setSelected(value);
  const handleChangeWords = (value) => setWords(value);

  const fetchDictionary = async () => {
    setLoading(true);
    const data = await apis.voices.getDictionary();
    if (data?.status) {
      const newWords = data.result?.words || [];
      setWords(newWords);
      handleChangeTotal(newWords.length);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setLoading(false);
    setPage(1);
    setWords([]);
    onClose();
    setSelected({});
  };

  const handleReset = () => {
    const newWords = words.filter((item) => !item.id);
    setWords(newWords);
    setTotal(newWords.length);
  };

  const handleAddWord = () => {
    const newWord = {
      id: uuidv4(),
      word: '',
      pronunciation: '',
    };
    handleChangeSelected(newWord);
    const currentWords = words.filter((item) => !item.id);
    const newWords = [newWord, ...currentWords];
    setWords(newWords);
    handleChangeTotal(newWords.length);
    setPage(1);
  };

  const handleSyncDictionary = async () => {
    if (Object.keys(selected).length) {
      dispatch(
        actions.noti.push({
          severity: 'warning',
          message: 'noteSyncDictionary',
        }),
      );
      return;
    }
    const data = await apis.voices.createDictionary(words);

    if (data?.status) {
      dispatch(
        actions.noti.push({
          severity: 'success',
          message: 'updateDictionarySuccess',
        }),
      );
      handleClose();
    } else {
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'updateDictionaryFailure',
        }),
      );
    }
  };

  useEffect(() => {
    fetchDictionary();
  }, [open]);

  return (
    <Dialog title={t('dictionary')} open={open} fullWidth onClose={handleClose}>
      <StyleDictionary>
        <DialogContent>
          <WordTable
            words={words}
            loading={loading}
            total={total}
            page={page}
            selected={selected}
            onChangePage={handleChangePage}
            onChangeSelected={handleChangeSelected}
            onChangeWords={handleChangeWords}
            onChangeTotal={handleChangeTotal}
            onChangeReset={handleReset}
          />
        </DialogContent>
        <DialogActions classes={{ root: 'dialog-action' }}>
          <Button
            className="button"
            variant="outlined"
            color="secondary"
            startIcon={<AddCircleOutline />}
            onClick={handleAddWord}
            disabled={loading}
          >
            {t('add')}
          </Button>
          <div>
            <Button className="button" onClick={handleClose}>
              {t('cancel')}
            </Button>
            <Button
              className="button"
              variant="contained"
              onClick={handleSyncDictionary}
              disabled={loading}
            >
              {t('sync')}
            </Button>
          </div>
        </DialogActions>
      </StyleDictionary>
    </Dialog>
  );
};

export default Dictionary;
