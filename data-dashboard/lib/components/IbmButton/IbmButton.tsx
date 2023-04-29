import styled from 'styled-components';

interface Props {
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

export default function IbmButton({ text, style }: Props): JSX.Element {
  return <IbmButtonComponent style={style}>{text}</IbmButtonComponent>;
}
