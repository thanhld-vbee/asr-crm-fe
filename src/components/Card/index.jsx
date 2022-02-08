import React from 'react';
import CardStyle from './index.style';

export default function Card({ children, ...props }) {
  return <CardStyle {...props}>{children}</CardStyle>;
}
