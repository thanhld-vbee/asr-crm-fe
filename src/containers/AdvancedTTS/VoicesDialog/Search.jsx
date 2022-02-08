import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { StyledSearch } from './index.style';

const Search = ({ search, value, name, title, options, onChange }) => {
  const { t } = useTranslation();

  const isChecked = (searchItem) =>
    typeof value === 'string'
      ? value === searchItem
      : value.includes(searchItem);

  const handleChangeSearch = (e) => {
    const stringType = typeof value === 'string';
    let newSearch;

    if (stringType) {
      newSearch = { ...search, [name]: e.target.value };
    } else {
      let tempSearch = value || [];
      if (e.target.checked) {
        tempSearch = [...tempSearch, e.target.value];
      } else {
        tempSearch = tempSearch.filter((item) => item !== e.target.value);
      }
      newSearch = { ...search, [name]: tempSearch };
    }
    onChange(newSearch);
  };

  return (
    <StyledSearch>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        classes={{ root: 'search-item-title' }}
      >
        <Typography variant="subtitle2">
          {title ? t(title) : t(name)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="search-item-content">
        <FormGroup aria-label="position" row className="form-group">
          {options.map((item) => (
            <FormControlLabel
              key={item.label}
              control={<Checkbox />}
              labelPlacement="end"
              label={t(item.label)}
              value={item.value}
              checked={isChecked(item.value)}
              onChange={handleChangeSearch}
              classes={{ label: 'checkbox-label' }}
            />
          ))}
        </FormGroup>
      </AccordionDetails>
    </StyledSearch>
  );
};

export default Search;
