import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip, Typography, IconButton } from '@mui/material';
import { Cached } from '@mui/icons-material';
import {
  GENDER,
  // VOICE_DOMAIN,
  // VOICE_TONE,
  // VOICE_FEATURE,
} from '@src/constants/voice';
import api from '@src/apis';
import Search from './Search';
import { StyledVoicesSearch } from './index.style';

const VoicesFilter = ({ filter, onChangeFilter, onHandleReset }) => {
  const [languages, setLanguages] = useState([]);
  const { t } = useTranslation();

  const fetchLanguages = async () => {
    const data = await api.voices.getLanguages();
    if (data.result) {
      const languageTemp = data.result.languages.map((item) => ({
        value: item.code,
        label: item.vietnameseName,
      }));
      setLanguages(languageTemp);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  return (
    <StyledVoicesSearch>
      <div className="header">
        <Typography variant="subtitle1" className="title">
          {t('quickVoiceFilter')}
        </Typography>
        <Tooltip title={t('reset')}>
          <IconButton onClick={onHandleReset}>
            <Cached />
          </IconButton>
        </Tooltip>
      </div>
      <Search
        search={filter}
        value={filter.gender}
        options={GENDER}
        name="gender"
        onChange={onChangeFilter}
      />
      {/* <Search
        search={filter}
        value={filter.tone}
        options={VOICE_TONE}
        name="tone"
        onChange={handleChangeFilter}
      />
      <Search
        search={filter}
        value={filter.domain}
        options={VOICE_DOMAIN}
        name="domain"
        onChange={handleChangeFilter}
      />
      <Search
        search={filter}
        value={filter.feature}
        options={VOICE_FEATURE}
        name="feature"
        onChange={handleChangeFilter}
      /> */}
      <Search
        search={filter}
        value={filter.languageCode}
        options={languages}
        name="languageCode"
        title="language"
        onChange={onChangeFilter}
      />
    </StyledVoicesSearch>
  );
};

export default VoicesFilter;
