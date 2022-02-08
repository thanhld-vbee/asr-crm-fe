import React from 'react';
import { Avatar, Badge } from '@mui/material';
import { randomColor } from '@src/services/color';
import { AVATAR_COLORS } from '@src/styles/config';
import { SmallAvatarStyled, BadgeAvatarStyled } from './index.style';

const BADGE_TYPE = { DOT: 'dot', IMAGE: 'image' };

const BadgeAvatar = ({
  img,
  name,
  number,
  shape = '',
  width = 40,
  smallImg,
  smallImgShape = '',
  smallImgWidth = 15,
  type = BADGE_TYPE.DOT,
  active,
}) => {
  const styledAvatar = {
    width: width || 40,
    fontWeight: '500',
    backgroundColor: randomColor(AVATAR_COLORS, number),
  };

  const avatarContent = !img && name && name.slice(0, 1).toUpperCase();

  if (type === BADGE_TYPE.DOT)
    return (
      <BadgeAvatarStyled
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        active={active}
        variant="dot"
      >
        <Avatar src={img} variant={shape || ''} sx={styledAvatar}>
          {avatarContent}
        </Avatar>
      </BadgeAvatarStyled>
    );

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <SmallAvatarStyled
          src={smallImg}
          variant={smallImgShape}
          sx={{ width: smallImgWidth }}
        />
      }
    >
      <Avatar src={img} variant={shape} sx={styledAvatar}>
        {avatarContent}
      </Avatar>
    </Badge>
  );
};

export default BadgeAvatar;
