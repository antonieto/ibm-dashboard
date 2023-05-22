import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;

  height: 100%;
  width: 100%;

  top: 0;
  left: 0;

  background-color: rgba($color: #000000, $alpha: 0.58);

  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalChildren = styled.div`
  position: absolute;
`;

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalContainer({
  open,
  onClose,
  children,
}: Props): JSX.Element | null {
  const closeOnEsc = (e: { charCode: number; keyCode: number }) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeOnEsc, false);
    return () => {
      document.removeEventListener('keydown', closeOnEsc, false);
    };
  });

  const modal = (
    <Modal
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <ModalChildren
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </ModalChildren>
    </Modal>
  );

  return open ? createPortal(modal, document.body) : null;
}
