import React from 'react';
import styled from 'styled-components';
import TextInputBox from '../atoms/TextInputBox';
import InputButton from '../atoms/InputButton';

interface NicknameInputBoxProps {
  inputValue: string;
  onButtonClick: () => void;
  onInputChange: (text: string) => void;
}

const NicknameInputBoxDiv = styled.div`
  display: flex;
  width: 21.375rem;
  height: 4.0625rem;
  align-items: center;
`;

const NicknameInputBox = ({
  inputValue,
  onInputChange,
  onButtonClick,
}: NicknameInputBoxProps) => {
  // const [inputValue, setInputValue] = useState<string>('');

  // const valueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };

  // const handleButtonClick = () => {
  //   // 버튼 클릭 시 inputValue의 값을 확인하는 임시 함수
  //   console.log(inputValue);
  // };

  return (
    <NicknameInputBoxDiv>
      <TextInputBox
        value={inputValue}
        setInputValue={onInputChange}
        onChange={(event) => {
          onInputChange(event.target.value);
        }}
        pressEnter={onButtonClick}
      />
      <InputButton buttonText="확인" onClick={onButtonClick} />
    </NicknameInputBoxDiv>
  );
};

export default NicknameInputBox;
