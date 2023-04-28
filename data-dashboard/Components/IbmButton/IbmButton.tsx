import styled from 'styled-components';

interface Props {
  text: string;
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

  &:hover {
    background-color: #0353e9;
  }

  &:active {
    background-color: #002d9c;
  }
`;

export default function IbmButton({ text }: Props) {
  return <IbmButtonComponent>{text}</IbmButtonComponent>;
}
