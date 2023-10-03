import styled from 'styled-components';
import theme from '../../style/theme';
import SoundEffects from '../../sounds/SoundEffects';

interface ButtonProps {
  buttonText: string;
  color: string;
  borderColor?: string;
  onClick?: () => void;
}

const StyledButton = styled.button<{ $bgColor: string }>`
  font-family: 'TmoneyRoundWindExtraBold';
  display: inline-block;
  height: 5.1875rem;
  margin: 0.3125rem;
  border-radius: 3.125rem;
  text-align: center;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.$bgColor};
  border: none;
  cursor: pointer;
`;

const ButtonText = styled.span<{ $fontColor: string }>`
  font-size: 1.5625rem;
  color: ${(props) => props.$fontColor};
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  margin-right: 2.125rem;
  margin-left: 2.125rem;
  white-space: pre-wrap;
`;

function Button({ buttonText, color, borderColor, onClick }: ButtonProps) {
  let bgColor = theme.colors.mainBlue; // 기본값은 mainBlue
  let fontColor = theme.colors.mainWhite;
  let buttonBorder = 'none';
  const { playBtnSmall2 } = SoundEffects();
  const handleClick = () => {
    playBtnSmall2(); // 버튼 클릭시 효과음 실행
    if (onClick) {
      onClick(); // 만약 외부에서 전달된 onClick 핸들러가 있다면 실행
    }
  };

  // color 값에 따라 bgColor를 설정
  switch (color) {
    case 'blue':
      bgColor = theme.colors.mainBlue;
      break;
    case 'skyblue':
      bgColor = '#F5FBFF';
      fontColor = theme.colors.mainBlack;
      break;
    case 'white':
      bgColor = theme.colors.mainWhite;
      fontColor = theme.colors.mainBlack;
      break;
    case 'salmon':
      bgColor = theme.colors.mainSalmon;
      break;
    case 'lightGreen':
      bgColor = theme.stageColors.green;
      break;
    case 'green':
      bgColor = theme.stageColors.darkGreen;
      break;
    case 'transparency':
      bgColor = theme.menuColors.transparentWhite;
      fontColor = theme.colors.mainBlack;
      break;
    case 'yellow':
      bgColor = theme.storeColors.yellow;
      fontColor = theme.colors.mainBlack;
      break;
    case 'gray':
      bgColor = theme.storeColors.gray;
      fontColor = theme.colors.mainBlack;
      break;
    case 'lightGray':
      bgColor = theme.colors.mainGray;
      fontColor = theme.colors.mainWhite;
      break;
    case 'darkGray':
      bgColor = theme.colors.darkGray;
      break;
    default:
      bgColor = theme.colors.mainBlue;
  }

  if (borderColor) {
    buttonBorder = `0.375rem solid ${borderColor}`;
  }

  return (
    <StyledButton
      $bgColor={bgColor}
      style={{ border: buttonBorder }}
      onClick={handleClick}
    >
      <ButtonText $fontColor={fontColor}>{buttonText}</ButtonText>
    </StyledButton>
  );
}

Button.defaultProps = {
  borderColor: undefined,
  onClick: undefined,
};
export default Button;
