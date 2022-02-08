import React from 'react';
import { Pagination } from '@mui/material';
import { StyledPagination } from './index.style';

const CustomPagination = ({ page, totalPages, onChangePage }) => {
  const handleChangePage = (e, value) => onChangePage(value);

  return (
    <StyledPagination>
      <Pagination
        color="primary"
        classes={{ root: 'pagination' }}
        count={totalPages}
        page={page}
        onChange={handleChangePage}
      />
    </StyledPagination>
  );
};

export default CustomPagination;
