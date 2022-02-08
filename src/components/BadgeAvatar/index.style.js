import { styled } from '@mui/material/styles';
import { Avatar, Badge } from '@mui/material';
import { COLOR } from '@src/styles/color';

const SmallAvatarStyled = styled(Avatar)`
  width: 15px;
  height: 15px;
  border: 2px solid ${COLOR.white};
`;

const BadgeAvatarStyled = styled(Badge)`
  .MuiBadge-badge {
    background-color: ${(props) =>
      props.active ? COLOR.success : COLOR.light};
    color: ${(props) => (props.active ? COLOR.success : COLOR.light)};
    box-shadow: ${COLOR.white} 0px 0px 0px 2px;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      content: '';
    }
  }
`;

export { SmallAvatarStyled, BadgeAvatarStyled };
