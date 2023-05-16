import styled from 'styled-components';
import { useEffect, useRef, useState, ReactNode } from 'react';
import { Settings, SettingsAdjust } from '@carbon/icons-react';
import { Title } from '@tremor/react';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface Props {
  children: ReactNode;
  title: string;
}

const CardComponent = styled.div<{ readonly selected: boolean }>`
  background-color: white;
  border: none;
  cursor: pointer;

  height: 100%;
  width: 100%;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  border: ${(props) => (props.selected ? '2px solid #0f62fe !important' : '')};

  display: flex;
  justify-content: center;
  flex-direction: column;

  padding: 20px;

  position: relative;
  z-index: 0;
`;
// background-color: #d2d3d4;
const SettingsContainer = styled.div`
  position: absolute;
  bottom: -20px;
  right: 10px;
  background-color: #fafafa;
  border-radius: 50px;

  height: fit-content;
  width: fit-content;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10;

  gap: 5px;
  padding-left: 10px;
  padding-right: 10px;

  border: 2px solid #0f62fe;

  overflow: hidden;
`;

const SettingsIcon = styled.div`
  border-radius: 50%;
  padding: 5px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #0f62fe;
    color: white;
  }

  &:active {
    background-color: #002d9c;
  }
`;

const Line = styled.div`
  height: 20px;
  border-left: 2px solid #d2d3d4;
  border-radius: 2px;
`;

export default function ChartCard({ children, title }: Props): JSX.Element {
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
    <CardComponent selected={selected} onClick={handleClick} ref={ref}>
      <Title>{title}</Title>
      {children}
      {selected && (
        <SettingsContainer
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SettingsIcon>
            <Settings aria-label="Add" size={24} />
          </SettingsIcon>
          <Line />
          <SettingsIcon>
            <SettingsAdjust aria-label="Add" size={24} />
          </SettingsIcon>
        </SettingsContainer>
      )}
    </CardComponent>
  );
}
