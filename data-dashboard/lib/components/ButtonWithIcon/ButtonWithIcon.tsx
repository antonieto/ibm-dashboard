import styled from 'styled-components';
import React from 'react';
import { CarbonIconType } from '@carbon/icons-react';

interface Props {
  text: string;
  icon: CarbonIconType;
  style?: React.CSSProperties;
}

const ButtonComponent = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 10px;

  padding-left: 16px;
  padding-right: 10px;

  background-color: transparent;
  border: 2px solid #0f62fe;
  cursor: pointer;
  height: 48px;
  width: fit-content;

  color: #0f62fe;
  font-size: 14px;

  &:hover {
    background-color: #0f62fe;
    color: white;
  }

  &:active {
    background-color: #002d9c;
    border: 2px solid #002d9c;
  }
`;

export default function ButtonWithIcon({
  text,
  icon: Icon,
  style = undefined,
}: Props): JSX.Element {
  return (
    <ButtonComponent style={style}>
      {text}
      <Icon aria-label="Add" size={24} />
    </ButtonComponent>
  );
}
