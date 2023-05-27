import styled from 'styled-components';
import React from 'react';
import { CarbonIconType } from '@carbon/icons-react';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  icon: CarbonIconType;
  style?: React.CSSProperties;
  iconLeft?: boolean;
}

const ButtonComponent = styled.button<{ readonly iconLeft: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.iconLeft ? 'row-reverse' : 'row')};
  align-items: center;
  justify-content: center;

  gap: 10px;

  padding-left: 16px;
  padding-right: 10px;

  background-color: white;
  border: 2px solid #0f62fe;
  cursor: pointer;
  height: 48px;
  width: fit-content;

  color: #0f62fe;
  font-size: 14px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0f62fe;
    color: white;
  }

  &:active {
    background-color: #002d9c;
    border: 2px solid #002d9c;
  }
`;

export default function ButtonWithIcon(props: Props): JSX.Element {
  const { text, icon: Icon, style = undefined, iconLeft = false } = props;
  return (
    <ButtonComponent style={style} iconLeft={iconLeft} {...props}>
      {text}
      <Icon aria-label={text} size={24} />
    </ButtonComponent>
  );
}
