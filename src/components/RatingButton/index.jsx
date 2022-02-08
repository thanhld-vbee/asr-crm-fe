import React, { useState } from 'react';
import { Popover, Box, IconButton } from '@mui/material';
import { Star, StarBorderOutlined } from '@mui/icons-material';
import { StyledRating } from './index.style';

const RatingButton = ({ rating, onChangeRating }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenRating = (e) => setAnchorEl(e.currentTarget);

  const handleCloseRating = () => setAnchorEl(null);

  const handleChangeRating = (e, newValue) => {
    onChangeRating(newValue);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenRating}>
        <StarBorderOutlined />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseRating}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box className="rating-wrapper">
          <StyledRating
            name="hover-feedback"
            value={rating}
            precision={0.5}
            onChange={handleChangeRating}
            emptyIcon={<Star />}
          />
        </Box>
      </Popover>
    </>
  );
};

export default RatingButton;
