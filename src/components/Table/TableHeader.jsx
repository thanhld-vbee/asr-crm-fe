import React from 'react';
import {
  Checkbox,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  UnfoldMore,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const CustomTableHeader = ({
  columns,
  selection,
  sort,
  showNumber,
  numSelected,
  rowCount,
  onSelectAll,
  onChangeSort,
}) => {
  const { t } = useTranslation();

  const renderSorter = (column) => {
    if (!column.sortable) return '';
    if (sort) {
      const [sortField, sorter] = sort.split('_');
      if (column.field === sortField)
        return sorter === 'asc' ? (
          <IconButton onClick={() => onChangeSort(`${column.field}_desc`)}>
            <KeyboardArrowDown className="header-icon" fontSize="small" />
          </IconButton>
        ) : (
          <IconButton onClick={() => onChangeSort(`${column.field}_asc`)}>
            <KeyboardArrowUp className="header-icon" fontSize="small" />
          </IconButton>
        );
    }
    return (
      <IconButton
        sx={{ opacity: '0.5' }}
        onClick={() => onChangeSort(`${column.field}_asc`)}
      >
        <UnfoldMore className="header-icon" fontSize="small" />
      </IconButton>
    );
  };

  return (
    <TableHead>
      <TableRow>
        {selection && (
          <TableCell className="header-cell" padding="checkbox" align="center">
            <Checkbox
              className="header-checkbox"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAll}
            />
          </TableCell>
        )}
        {showNumber && (
          <TableCell className="header-cell" align="center">
            <Typography className="header-title">{t('no')}</Typography>
          </TableCell>
        )}
        {columns.map((column) => (
          <TableCell
            className="header-cell"
            key={column.field}
            align={column.align}
          >
            <div className={`header-item header-${column.align}`}>
              <Typography className="header-title">{column.title}</Typography>
              {renderSorter(column)}
            </div>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHeader;
