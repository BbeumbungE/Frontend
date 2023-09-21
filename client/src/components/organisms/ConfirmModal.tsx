import React from 'react';
import styled from 'styled-components';
import WhiteModal from '../atoms/WhiteModal';
import Button from '../atoms/Button';

interface ConfirmModalProps {
  noCheck: () => void;
  okCheck: () => void;
  title: string;
}
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  top: 50%;
  z-index: 301;
  display: flex;
  flex-direction: row;
`;
const ConfirmModal = ({ noCheck, okCheck, title }: ConfirmModalProps) => {
  return (
    <ModalWrapper>
      <WhiteModal modalText={title} height={200} />
      <ButtonWrapper>
        <Button buttonText="취소" color="lightGray" onClick={noCheck} />
        <Button buttonText="확인" color="salmon" onClick={okCheck} />
      </ButtonWrapper>
    </ModalWrapper>
  );
};
export default ConfirmModal;
