import { Download, OverflowMenuHorizontal } from '@carbon/icons-react';
import styled from 'styled-components';
import ExcelIcon from '../ExcelIcon/ExcelIcon';

interface Props {
  id: string;
  fileName: string;
  createdAt: Date;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  &:hover {
    background-color: #f4f5f5;
  }
`;

const FileIconContainer = styled.div`
  margin-right: 20px;
`;

const DataSourceDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: max-content;
`;

const DataSourceTitle = styled.span`
  font-size: 1.2rem;
  `;

const DataSourceSubtitle = styled.span`
  font-size: 1rem;
  color: #8A8A8A;
`;

const DataSourceFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

const IconsFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const IconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function DataSourceItem({ id, fileName, createdAt }: Props) {
  console.log(id);
  return (
    <Row>
      <DataSourceFlexContainer>
        <FileIconContainer>
          <ExcelIcon height={64} width={64} />
        </FileIconContainer>
        <DataSourceDescription>
          <DataSourceTitle>{fileName}</DataSourceTitle>
          <DataSourceSubtitle>
            {16}
            {' '}
            MB
          </DataSourceSubtitle>
          <DataSourceSubtitle>
            Created on
            {' '}
            {createdAt.toLocaleDateString()}
          </DataSourceSubtitle>
        </DataSourceDescription>
      </DataSourceFlexContainer>
      <IconsFlexContainer>
        <IconsContainer>
          <button type="button">
            <OverflowMenuHorizontal size={32} />
          </button>
          <button type="button">
            <Download size={32} />
          </button>
        </IconsContainer>
      </IconsFlexContainer>
    </Row>
  );
}
