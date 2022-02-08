import React from 'react';
import { Pagination, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PAGINATION_LIMIT } from '@src/constants';
import { StyledTableFooter } from './index.style';

const CustomTableFooter = ({ total, page, onChangePage }) => {
  const { t } = useTranslation();

  const handleChangePage = (event, newPage) => {
    onChangePage(newPage);
  };

  const from = (page - 1) * PAGINATION_LIMIT + 1;
  const to = page * PAGINATION_LIMIT < total ? page * PAGINATION_LIMIT : total;

  return (
    <StyledTableFooter>
      <Typography className="footer-label">
        {t('footerLabel', { from, to, total })}
      </Typography>
      {total > PAGINATION_LIMIT && (
        <Pagination
          count={Math.ceil(total / PAGINATION_LIMIT)}
          page={page}
          color="primary"
          onChange={handleChangePage}
        />
      )}
    </StyledTableFooter>
  );
};

export default CustomTableFooter;
