import { AVATAR_COLORS } from '@src/styles/config';

const randomColor = (colors = AVATAR_COLORS, num) => {
  if (num) {
    const index = num % colors.length;
    const color = colors[index];
    return color;
  }

  const randomIndex = Math.floor(Math.random() * colors.length);
  const color = colors[randomIndex];
  return color;
};

export { randomColor };
