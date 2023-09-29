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
  margin-right: 0.25rem;
`;

const Input = styled.input`
  width: 16.375rem;
  height: 3.875rem;
  padding: 0.5rem;
  font-size: 2.5rem;
  font-family: 'TmoneyRoundWindRegular';
  color: ${theme.colors.mainBlack};
  &::placeholder {
    font-size: 1.6875rem;
    color: ${theme.colors.mainBlack};
    padding-top: 0.3125rem;
  }
  text-align: center;
  background-color: ${theme.colors.mainWhite};
  border-radius: 0.9375rem;
  border: 0.1875rem solid ${theme.colors.lightPurple};
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
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            pressEnter();
          }
        }}
      />
    </TextInputWrapper>
  );
}

TextInput.defaultProps = {
  placeholder: '',
};

export default TextInput;
