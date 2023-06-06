import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 93%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  margin-top: 70px;
`;

interface Props {
  onConfirm: (dataSource: 'files' | 'database') => void;
  header?: JSX.Element;
}

export default function DataSourceSelection({
  onConfirm,
  header,
}: Props): JSX.Element {
  return <Container>{header}</Container>;
}
