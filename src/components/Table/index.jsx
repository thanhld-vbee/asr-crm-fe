import React, { useState } from 'react';
import { Table } from '@mui/material';
import { StyledTable } from './index.style';
import CustomTableHeader from './TableHeader';
import CustomTableBody from './TableBody';
import CustomTableFooter from './TableFooter';
import NoData from '../NoData';

// columns, data, total, page, onChangePage are required
const CustomTable = ({
  columns,
  data,
  total,
  page,
  sort,
  selection,
  loading,
  showNumber,
  onChangePage,
  onChangeSort,
  onRowClick,
}) => {
  const [selected, setSelected] = useState([]);

  const isSelected = (id) => selected.includes(id);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((rowData) => rowData.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectRow = (id) => (event) => {
    if (event.target.checked && !selected.includes(id)) {
      setSelected([...selected, id]);
      return;
    }
    setSelected(selected.filter((item) => item !== id));
  };

  // TODO: fixed table body height when change page
  // TODO: add loading data and show no data
  // TODO: add handle when selection checkbox
  return (
    <>
      <StyledTable>
        <Table>
          <CustomTableHeader
            columns={columns}
            selection={selection}
            sort={sort}
            showNumber={showNumber}
            numSelected={selected.length}
            rowCount={data.length}
            onSelectAll={handleSelectAll}
            onChangeSort={onChangeSort}
          />
          <CustomTableBody
            page={page}
            columns={columns}
            data={data}
            selection={selection}
            showNumber={showNumber}
            isSelected={isSelected}
            loading={loading}
            onSelectRow={handleSelectRow}
            onRowClick={onRowClick}
          />
        </Table>
      </StyledTable>
      {data && data.length ? (
        <CustomTableFooter
          total={total}
          page={page}
          onChangePage={onChangePage}
        />
      ) : (
        <NoData />
      )}
    </>
  );
};

export default CustomTable;
