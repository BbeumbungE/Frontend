import React, { useState } from 'react';
import styled from 'styled-components';
import TextInputBox from '../atoms/TextInputBox';
import InputButton from '../atoms/InputButton';

interface NicknameInputBoxProps {
  onButtonClick: () => void;
}

const NicknameInputBoxDiv = styled.div`
  display: flex;
  width: 345px;
  height: 65px;
  align-items: center;
`;

const NicknameInputBox = ({ onButtonClick }: NicknameInputBoxProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const valueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // const handleButtonClick = () => {
  //   // 버튼 클릭 시 inputValue의 값을 확인하는 임시 함수
  //   console.log(inputValue);
  // };

  return (
    <NicknameInputBoxDiv>
      <TextInputBox
        value={inputValue}
        setInputValue={setInputValue}
        onChange={valueChange}
      />
      <InputButton buttonText="확인" onClick={onButtonClick} />
    </NicknameInputBoxDiv>
  );
};

export default NicknameInputBox;
