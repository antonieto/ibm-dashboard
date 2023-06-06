import React from 'react';
import styled from 'styled-components';
import { ChartColumn, ChartLine, ChartPie, Close } from '@carbon/icons-react';
import useOutsideClick from '@/lib/hooks/useOutsideClick';

const MenuContainer = styled.div`
  background-color: #f8f8f8;

  height: fit-content;

  min-width: 287px;
  width: fit-content;

  display: flex;
  flex-direction: column;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  border: 1px solid #d2d3d4;
`;

const MenuItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #d2d3d4;
  transition: all 0.2s ease-in-out;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  color: #393939;
  font-size: 14px;

  cursor: pointer;

  &:hover {
    background-color: #d2d3d4;
  }

  &:active {
    background-color: #a6a7a8;
  }
`;

const MenuTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #393939;

  padding: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  border-bottom: 1px solid #d2d3d4;
`;

export type ChartType = 'bar' | 'line' | 'pie';

interface Props {
  onSelect: (type: ChartType) => void;
  onClose: () => void;
}

export default function ChartTypeMenu({
  onSelect,
  onClose,
}: Props): JSX.Element {
  const menuRef = useOutsideClick(onClose);

  const handleSelect = (type: ChartType) => {
    onSelect(type);
    onClose();
  };

  return (
    <MenuContainer ref={menuRef}>
      <MenuTitle>
        Tipo de grafica
        <Close
          aria-label="Close"
          size={16}
          style={{ cursor: 'pointer' }}
          onClick={onClose}
        />
      </MenuTitle>
      <MenuItem onClick={() => handleSelect('bar')}>
        Barras
        <ChartColumn aria-label="ChartColumn" size={24} />
      </MenuItem>
      <MenuItem onClick={() => handleSelect('line')}>
        Linea
        <ChartLine aria-label="ChartLine" size={24} />
      </MenuItem>
      <MenuItem onClick={() => handleSelect('pie')}>
        Pastel
        <ChartPie aria-label="ChartPie" size={24} />
      </MenuItem>
    </MenuContainer>
  );
}
