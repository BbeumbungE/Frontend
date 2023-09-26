import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value: string;
  setInputValue: (value: string) => void;
  pressEnter: () => void;
}

// 스타일드 컴포넌트를 사용하여 Text input 스타일링
const TextInputWrapper = styled.div`
  display: inline-block;
  padding: 0;
  margin-right: 4px;
`;

const Input = styled.input`
  width: 262px;
  height: 62px;
  padding: 8px;
  font-size: 40px;
  font-family: 'TmoneyRoundWindRegular';
  color: ${theme.colors.mainBlack};
  &::placeholder {
    font-size: 27px;
    color: ${theme.colors.mainBlack};
    padding-top: 5px;
  }
  text-align: center;
  background-color: ${theme.colors.mainWhite};
  border-radius: 15px;
  border: 3px solid ${theme.colors.lightPurple};
  outline: none;
  padding: 0;
  margin: 0;
`;

// Text input Atom 컴포넌트 정의
function TextInput({
  placeholder,
  value,
  setInputValue,
  pressEnter,
}: InputProps) {
  // const [inputValue, setInputValue] = useState<string>(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 문자열의 실제 길이를 계산하여 최대 6글자로 제한
    const newValue = event.target.value.slice(0, 6);
    setInputValue(newValue);
  };

  return (
    <TextInputWrapper>
      <Input
        type="text"
        value={value}
        onChange={handleInputChange} // 이벤트 핸들러 함수 연결
        placeholder={placeholder}
        maxLength={6}
        onMouseEnter={pressEnter}
      />
    </TextInputWrapper>
  );
}

TextInput.defaultProps = {
  placeholder: '',
};

export default TextInput;
