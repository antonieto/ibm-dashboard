import styled from 'styled-components';

interface Props {
  placeholder: string;
}

const IbmSearchBarComponent = styled.input`
  height: 48px;
  width: 100%;

  border: none;
  border-bottom: 1px solid #8d8d8d;

  background-color: #f4f4f4;

  padding-left: 16px;
`;

export default function IbmSearchBar({ placeholder }: Props): JSX.Element {
  return <IbmSearchBarComponent type="text" placeholder={placeholder} />;
}
