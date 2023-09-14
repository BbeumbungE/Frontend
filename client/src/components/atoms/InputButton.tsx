import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
}

const StyledButton = styled.button`
  font-family: 'TmoneyRoundWindExtraBold';
  display: inline-block;
  min-width: 100px;
  height: 62px;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  background-color: ${theme.colors.mainBlue};
  border: none;
  cursor: pointer;
  font-size: 30px;
  color: ${theme.colors.mainWhite};
`;

const Button = ({ buttonText, onClick }: ButtonProps) => {
  return <StyledButton onClick={onClick}>{buttonText}</StyledButton>;
};

export default Button;
