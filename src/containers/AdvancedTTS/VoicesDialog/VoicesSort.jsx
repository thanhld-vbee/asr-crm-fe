import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { Cached } from '@mui/icons-material';
import { ORDER_BY, VOICE_CRITERIA_SORT } from '@src/constants/voice';
import Search from './Search';
import { StyledVoicesSearch } from './index.style';

const initSort = { orderBy: '', criteria: [] };

const VoicesSort = () => {
  const [sort, setSort] = useState(initSort);
  const { t } = useTranslation();

  const handleReset = () => setSort(initSort);

  const handleChangeSort = (value) => setSort(value);

  return (
    <StyledVoicesSearch>
      <div className="header">
        <Typography variant="subtitle1" className="title">
          {t('sortedBy')}
        </Typography>
        <div className="reset" role="presentation" onClick={handleReset}>
          <Typography variant="caption" className="reset-title">
            {t('reset')}
          </Typography>
          <Cached className="reset-icon" />
        </div>
      </div>
      <Search
        search={sort}
        value={sort.orderBy}
        options={ORDER_BY}
        name="orderBy"
        onChange={handleChangeSort}
      />
      <Search
        search={sort}
        value={sort.criteria}
        options={VOICE_CRITERIA_SORT}
        name="criteria"
        onChange={handleChangeSort}
      />
    </StyledVoicesSearch>
  );
};

export default VoicesSort;
