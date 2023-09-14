import styled from 'styled-components';
import NicknameInputBox from './NicknameInputBox';
import LargeProfileImg from '../atoms/LargeProfileImg';

interface NewProfileProps {
  inputValue: string;
  onClick: () => void;
  onTextInputChange: (text: string) => void;
}

const NewProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewProfile = ({
  inputValue,
  onClick,
  onTextInputChange,
}: NewProfileProps) => {
  return (
    <NewProfileWrapper>
      <LargeProfileImg
        imgsrc={`${process.env.REACT_APP_IMG_URL}/item/avatar/hamster.png`}
        profileCharacter="hamster"
        onClick={() => {
          console.log('btn');
        }}
      />
      <NicknameInputBox
        inputValue={inputValue}
        onButtonClick={onClick}
        onInputChange={onTextInputChange}
      />
    </NewProfileWrapper>
  );
};

export default NewProfile;
