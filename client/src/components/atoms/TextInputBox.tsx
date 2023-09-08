import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';

interface InputProps {
  placeholder?: string;
}

// 스타일드 컴포넌트를 사용하여 Text input 스타일링
const TextInputWrapper = styled.div`
  display: inline-block;
  padding: 0;
  margin: 0;
`;

const Input = styled.input`
  width: 262px;
  height: 62px;
  padding: 8px;
  font-size: 40px;
  font-family: 'TmoneyRoundWindRegular';
  color: white;
  text-align: center;
  background-color: ${theme.colors.mainGray};
  border-radius: 15px;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
`;

// Text input Atom 컴포넌트 정의
function TextInput({ placeholder }: InputProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 문자열의 실제 길이를 계산하여 최대 6글자로 제한
    const newValue = event.target.value.slice(0, 6);
    setInputValue(newValue);
  };

  return (
    <TextInputWrapper>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange} // 이벤트 핸들러 함수 연결
        placeholder={placeholder}
        maxLength={6}
      />
    </TextInputWrapper>
  );
}

TextInput.defaultProps = {
  placeholder: '',
};

export default TextInput;
