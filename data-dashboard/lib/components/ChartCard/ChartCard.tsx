import styled from 'styled-components';
import React from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface Props {
  children: React.ReactNode;
}

const Card = styled.div`
  background-color: white;
  border: none;
  cursor: pointer;

  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

export default function ChartCard({ children }: Props): JSX.Element {
  return <Card>{children}</Card>;
}
