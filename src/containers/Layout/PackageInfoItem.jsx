import React from 'react';
import classNames from 'classnames';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { StyledTooltip } from './index.style';

const PackageInfoItem = ({ name, icon, value, isDangerText }) => {
  const { t } = useTranslation();

  return (
    <div className="package-info-item">
      <Box className="large-package-info-item">
        <Typography
          className={classNames('text', {
            'error-text': isDangerText,
          })}
        >
          {t(name)}:{' '}
        </Typography>
        <Typography
          className={classNames('text bold', {
            'error-text': isDangerText,
          })}
        >
          {value}
        </Typography>
      </Box>
      <StyledTooltip title={t(name)} arrow>
        <Box className="medium-package-info-item">
          <img
            src={icon}
            alt={`icon-${name}`}
            className={classNames('package-info-icon', {
              'error-text': isDangerText,
            })}
          />
          <Typography
            className={classNames('text bold', {
              'error-text': isDangerText,
            })}
          >
            {value}
          </Typography>
        </Box>
      </StyledTooltip>
      <StyledTooltip title={`${t(name)} - ${value}`} arrow>
        <Box className="small-package-info-item">
          <img
            src={icon}
            alt={`icon-${name}`}
            className={classNames('package-info-icon', {
              'error-text': isDangerText,
            })}
          />
        </Box>
      </StyledTooltip>
    </div>
  );
};

export default PackageInfoItem;
