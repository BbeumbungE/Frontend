import styled from 'styled-components';
import theme from '../../style/theme';
import WhiteModal from '../atoms/WhiteModal';
import NicknameInputBox from './NicknameInputBox';

interface NameChangeModalProps {
  inputValue: string;
  onClick: () => void;
  onTextInputChange: (text: string) => void;
  title: string;
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
`;
const InputWrapper = styled.div`
  position: fixed;
  top: 50%;
  z-index: 301;
`;
const NameChangeModal = ({
  title,
  inputValue,
  onClick,
  onTextInputChange,
}: NameChangeModalProps) => {
  return (
    <ModalWrapper>
      <WhiteModal modalText={title} height={250} />
      <InputWrapper>
        <NicknameInputBox
          inputValue={inputValue}
          onButtonClick={onClick}
          onInputChange={onTextInputChange}
        />
      </InputWrapper>
    </ModalWrapper>
  );
};

export default NameChangeModal;
