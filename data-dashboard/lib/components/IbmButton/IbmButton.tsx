import styled from 'styled-components';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  style?: React.CSSProperties;
}

const IbmButtonComponent = styled.button`
  background-color: #0f62fe;
  border: none;
  cursor: pointer;
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 16px;
  color: white;
  font-size: 14px;

  &:hover {
    background-color: #0353e9;
  }

  &:active {
    background-color: #002d9c;
  }
`;

export default function IbmButton(props: Props): JSX.Element {
  const { text, style } = props;

  return (
    <IbmButtonComponent
      {...{ ...props, text: undefined, style: undefined }}
      style={style}
    >
      {text}
    </IbmButtonComponent>
  );
}
