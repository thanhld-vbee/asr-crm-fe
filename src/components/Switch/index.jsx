import React from 'react';
import { StyledSwitch } from './index.style';

const CustomSwitch = ({
  checked,
  noneCheckedColor,
  checkedColor,
  onChange,
  disabled,
}) => {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.checked);
  };

  return (
    <StyledSwitch
      noneCheckedColor={noneCheckedColor}
      checkedColor={checkedColor}
      checked={checked}
      disabled={disabled}
      onChange={handleChange}
    />
  );
};

export default CustomSwitch;
