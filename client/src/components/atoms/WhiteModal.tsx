import styled from 'styled-components';

interface ModalProps {
  modalText: string;
  height: number;
  // onClick?: () => void;
}

const StyledModal = styled.div<{ height: number }>`
  font-family: 'TmoneyRoundWindExtraBold';
  display: inline-block;
  height: ${(props) => props.height}px;
  margin: 1.25rem;
  padding: 3.125rem;
  border-radius: 1.5625rem;
  text-align: center;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.theme.colors.mainWhite};
  cursor: pointer;
  z-index: 200;
`;

const ModalText = styled.span`
  font-size: 1.875rem;
  color: ${(props) => props.theme.colors.mainBlack};
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  margin-right: 2.125rem;
  margin-left: 2.125rem;
`;

function WhiteModal({ modalText, height }: ModalProps) {
  return (
    <StyledModal height={height}>
      <ModalText>{modalText}</ModalText>
    </StyledModal>
  );
}

export default WhiteModal;
