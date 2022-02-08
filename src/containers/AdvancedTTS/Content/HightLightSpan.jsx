import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@mui/material';

import { findItemKeyInMap } from '@src/services/entity';

import { StyledMapEditor } from './index.style';

const HightLightSpan = ({ contentState, entityKey, offsetKey, children }) => {
  const { t } = useTranslation();
  const { entityMap } = contentState.toJS();
  const entityName = findItemKeyInMap(entityMap, entityKey);

  const [name, value] = entityName.split('-');

  const displayName = name?.toLowerCase() || '';
  const displayValue = value?.toLowerCase() || '';

  const hasValue = (val) => val === 'TRUE';
  const displayTitle = hasValue(value)
    ? `${t(displayName)}`
    : `${t(displayName)} - ${t(displayValue)}`;

  return (
    <Tooltip arrow placement="top-end" title={displayTitle}>
      <span data-offset-key={offsetKey} style={StyledMapEditor[name]}>
        {children}
      </span>
    </Tooltip>
  );
};

export default HightLightSpan;
