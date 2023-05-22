import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Close } from '@carbon/icons-react';
import { TextInput, InputField, IbmButton } from '@/lib/components';
import ModalContainer from '../ModalContainer/ModalContainer';

const Modal = styled.div`
  width: 30vw;
  height: wrap-content;
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

const Description = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: #161616;
  margin-bottom: 24px;
`;

const InputContainer = styled.div`
  margin-bottom: 60px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  width: 50%;
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (title: string) => void;
}

export default function BoardTitleModal({
  open,
  onClose,
  onConfirm,
}: Props): JSX.Element {
  const [title, setTitle] = useState('');
  const handleOnClose = () => {
    setTitle('');
    onClose();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  const handleOnConfirm = () => {
    onConfirm(title);
    handleOnClose();
  };

  return (
    <ModalContainer open={open} onClose={handleOnClose}>
      <Modal>
        <CloseIcon onClick={handleOnClose}>
          <Close aria-label="Add" size={24} />
        </CloseIcon>
        <Title>Nuevo tablero</Title>
        <Description>Ingresa el nombre del nuevo tablero.</Description>
        <InputContainer>
          <InputField
            label="Nombre del tablero"
            name="title"
            inputChild={TextInput}
            inputProps={{
              type: 'text',
              value: title,
              onChange: handleChange,
              placeholder: 'Nombre del tablero',
              required: true,
              style: { width: '100%' },
            }}
          />
        </InputContainer>

        <ButtonContainer>
          <IbmButton text="Crear un tablero" onClick={handleOnConfirm} />
        </ButtonContainer>
      </Modal>
    </ModalContainer>
  );
}
