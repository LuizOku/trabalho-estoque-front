import React from 'react';

import { StyledTable } from './styles.css';

export default function DataTable({ children }) {
  return <StyledTable className="container">{children}</StyledTable>;
}
