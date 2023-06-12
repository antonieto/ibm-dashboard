import styled from 'styled-components';
import { Close } from '@carbon/icons-react';
import { Spreadsheet } from 'react-spreadsheet';
import ModalContainer from '../ModalContainer/ModalContainer';

const Modal = styled.div`
  max-width: 60vw;
  max-height: 80vh;
  overflow: scroll;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;

  padding: 34px;
`;

const CloseIcon = styled.div`
  cursor: pointer;

  position: absolute;
  right: 34px;
  top: 36px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #161616;
`;

interface Props {
  open: boolean;
  onClose: () => void;
  data: (string | number)[][];
}

export default function XLSXModal({
  open,
  onClose,
  data,
}: Props): JSX.Element {
  return (
    <ModalContainer open={open} onClose={onClose}>
      <Modal>
        <CloseIcon onClick={onClose}>
          <Close aria-label="Add" size={24} />
        </CloseIcon>
        <Title>Vista Previa</Title>
        <Spreadsheet data={data.map((row) => (
          row.map((cell) => ({ value: cell ?? '' }))
        ))}
        />
      </Modal>
    </ModalContainer>
  );
}
