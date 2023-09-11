import styled from 'styled-components';
import theme from '../../style/theme';

interface ButtonProps {
  buttonText: string;
  // onClick?: () => void;
}

const StyledButton = styled.button`
  font-family: 'TmoneyRoundWindExtraBold';
  display: inline-block;
  height: 62px;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  background-color: ${theme.colors.mainBlue};
  border: none;
  cursor: pointer;
`;

const ButtonText = styled.span`
  font-size: 30px;
  color: ${theme.colors.mainWhite};
  margin-top: 24px;
  margin-bottom: 24px;
  margin-right: 34px;
  margin-left: 34px;
`;

const Button = ({ buttonText }: ButtonProps) => {
  return (
    <StyledButton>
      <ButtonText>{buttonText}</ButtonText>
    </StyledButton>
  );
};

export default Button;
