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
  margin: 20px;
  padding: 50px;
  border-radius: 25px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.theme.colors.mainWhite};
  cursor: pointer;
  z-index: 200;
`;

const ModalText = styled.span`
  font-size: 30px;
  color: ${(props) => props.theme.colors.mainBlack};
  margin-top: 24px;
  margin-bottom: 24px;
  margin-right: 34px;
  margin-left: 34px;
`;

function WhiteModal({ modalText, height }: ModalProps) {
  return (
    <StyledModal height={height}>
      <ModalText>{modalText}</ModalText>
    </StyledModal>
  );
}

export default WhiteModal;
