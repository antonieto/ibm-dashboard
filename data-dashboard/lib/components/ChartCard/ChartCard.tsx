import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface Props {
  children: React.ReactNode;
}

const Card = styled.div<{ readonly selected: boolean }>`
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

  border: ${(props) => (props.selected ? '2px solid #0f62fe !important' : '')};
`;

export default function ChartCard({ children }: Props): JSX.Element {
  const [selected, setSelected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSelected(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <Card selected={selected} onClick={handleClick} ref={ref}>
      {children}
    </Card>
  );
}
