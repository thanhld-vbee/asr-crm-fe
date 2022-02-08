import React from 'react';
import {
  Checkbox,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
} from '@mui/material';
import { PAGINATION_LIMIT } from '@src/constants';

const CustomTableBody = ({
  page,
  columns,
  data,
  selection,
  showNumber,
  isSelected,
  loading,
  onSelectRow,
  onRowClick,
}) => {
  const handleRowClick = (rowId) => {
    if (onRowClick) onRowClick(rowId);
  };

  return (
    <TableBody>
      {loading ? (
        <TableRow className="body-row">
          <TableCell>
            <CircularProgress />
          </TableCell>
        </TableRow>
      ) : (
        data.map((rowData, index) => (
          <TableRow
            className="body-row"
            onClick={() => handleRowClick(rowData.id)}
          >
            {selection && (
              <TableCell
                className="body-cell"
                padding="checkbox"
                align="center"
              >
                <Checkbox
                  color="primary"
                  checked={isSelected(rowData.id)}
                  onChange={onSelectRow(rowData.id)}
                />
              </TableCell>
            )}
            {showNumber && (
              <TableCell className="body-cell" align="center">
                {(page - 1) * PAGINATION_LIMIT + index + 1}
              </TableCell>
            )}
            {columns.map((column) => (
              <TableCell className="body-cell" align={column.align}>
                {column.render ? column.render(rowData) : rowData[column.field]}
              </TableCell>
            ))}
          </TableRow>
        ))
      )}
    </TableBody>
  );
};

export default CustomTableBody;
