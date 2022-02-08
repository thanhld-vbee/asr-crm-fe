import React from 'react';
import { Done } from '@mui/icons-material';
import { Box } from '@mui/material';
import { StyledBankItem } from './index.style';

const BankItem = ({ bank, selected, onSelect }) => {
  const handleSelectBank = () => onSelect(bank.name);

  return (
    <StyledBankItem selected={selected} onClick={handleSelectBank}>
      <img src={bank && bank.logo} alt="icon bank" />
      {selected && (
        <Box className="done-box">
          <span className="done-circle">
            <Done />
          </span>
          <span className="done-trick" />
        </Box>
      )}
    </StyledBankItem>
  );
};
export default BankItem;
