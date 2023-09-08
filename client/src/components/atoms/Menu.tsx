import styled from 'styled-components';
import theme from '../../style/theme';

interface ButtonProps {
  buttonText: string;
  color: string;
  // onClick?: () => void;
}

const StyledMenu = styled.div<{ bgColor: string }>`
  font-family: 'TmoneyRoundWindExtraBold';
  width: 370px;
  height: 510px;
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.theme.menuColors.bgColor};
  border: none;
  cursor: pointer;
`;

const ButtonText = styled.span<{ $fontColor: string }>`
  font-size: 30px;
  color: ${(props) => props.$fontColor};
  margin-top: 24px;
  margin-bottom: 24px;
  margin-right: 34px;
  margin-left: 34px;
`;

function Button({ buttonText, color }: ButtonProps) {
  let bgColor = theme.colors.mainBlue; // 기본값은 mainBlue
  let fontColor = theme.colors.mainWhite;

  switch (color) {
    case 'pink':
      bgColor = theme.menuColors.pink;
      break;
    case 'green':
      bgColor = theme.menuColors.green;
      break;
    case 'yellow':
      bgColor = theme.menuColors.yellow;
      break;
    case 'blue':
      bgColor = theme.menuColors.blue;
      break;
    case 'mint':
      bgColor = theme.menuColors.transparentWhite;
      break;
    case 'yellow':
      bgColor = theme.storeColors.yellow;
      fontColor = theme.colors.mainBlack;
      break;
    case 'gray':
      bgColor = theme.storeColors.gray;
      fontColor = theme.colors.mainBlack;
      break;
    case 'darkGray':
      bgColor = theme.colors.darkGray;
      break;
    default:
      bgColor = theme.colors.mainBlue;
  }

  return (
    <StyledMenu $bgColor={bgColor}>
      <ButtonText $fontColor={fontColor}>{buttonText}</ButtonText>
    </StyledMenu>
  );
}

export default Menu;
