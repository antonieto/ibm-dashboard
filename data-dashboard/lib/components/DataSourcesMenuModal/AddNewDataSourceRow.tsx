import { DocumentAdd } from '@carbon/icons-react';
import { useRef } from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 8px;
  margin-top: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f4f5f5;
  }
`;

const RowTitle = styled.h3`
  font-size: 1rem;
  color: #0F62FE;
`;

const RowSubtitle = styled.span`
  font-size: 0.8rem;
  color: #8A8A8A;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-betwen;
  margin-left: 20px;
`;

const HiddenFileInput = styled.input`
  visibility: hidden;
`;

interface Props {
  onSelectFile: (file:File) => void;
}

export default function AddNewDataSourceRow({ onSelectFile }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <HiddenFileInput
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onSelectFile(e.target.files[0]);
          }
        }}
      />
      <Row onClick={() => fileInputRef.current?.click()}>
        <DocumentAdd height={64} width={64} />
        <DescriptionContainer>
          <RowTitle>Agregar fuente de datos</RowTitle>
          <RowSubtitle>Max 16MB</RowSubtitle>
        </DescriptionContainer>
      </Row>
    </>
  );
}
