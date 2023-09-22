import styled from 'styled-components';
import theme from '../../style/theme';

interface ButtonProps {
  buttonText: string;
  color: string;
  borderColor?: string;
  onClick?: () => void;
  cursor: string;
}

const StyledButton = styled.button<{ $bgColor: string; $cursor: string }>`
  font-family: 'TmoneyRoundWindExtraBold';
  display: inline-block;
  height: 63px;
  margin: 0;
  border-radius: 50px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.$bgColor};
  border: none;
  cursor: ${(props) => props.$cursor};
`;

const ButtonText = styled.span<{ $fontColor: string }>`
  font-size: 21px;
  color: ${(props) => props.$fontColor};
  margin-top: 4px;
  margin-bottom: 4px;
  margin-right: 5px;
  margin-left: 5px;
  white-space: pre-wrap;
`;

function SmallButton({
  buttonText,
  color,
  borderColor,
  onClick,
  cursor,
}: ButtonProps) {
  let bgColor = theme.colors.mainBlue; // 기본값은 mainBlue
  let fontColor = theme.colors.mainWhite;
  let buttonBorder = 'none';

  // color 값에 따라 bgColor를 설정
  switch (color) {
    case 'blue':
      bgColor = theme.colors.mainBlue;
      break;
    case 'skyblue':
      bgColor = '#F5FBFF';
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
    buttonBorder = `3px solid ${borderColor}`;
  }

  return (
    <StyledButton
      $bgColor={bgColor}
      $cursor={cursor}
      style={{ border: buttonBorder }}
      onClick={onClick}
    >
      <ButtonText $fontColor={fontColor}>{buttonText}</ButtonText>
    </StyledButton>
  );
}

SmallButton.defaultProps = {
  borderColor: undefined,
  onClick: undefined,
};
export default SmallButton;