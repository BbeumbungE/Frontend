import styled from 'styled-components';
import theme from '../../style/theme';

interface ButtonProps {
  buttonText: string;
  color: string;
  // onClick?: () => void;
}

const StyledMenu = styled.div<{ $bgColor: string; $border: string }>`
  font-family: 'TmoneyRoundWindExtraBold';
  width: 370px;
  height: 500px;
  margin: 20px;
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.$bgColor};
  border: ${(props) => props.$border};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: left;
  overflow-wrap: break-word;
`;

const MenuText = styled.div`
  font-size: 50px;
  color: ${(props) => props.theme.colors.mainBlack};
  margin-top: 30px;
  margin-bottom: 30px;
  margin-right: 34px;
  margin-left: 34px;
`;

function Menu({ buttonText, color }: ButtonProps) {
  let bgColor = theme.menuColors.pink; // 기본값은 mainBlue
  let border = 'none';

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
      bgColor = theme.menuColors.mint;
      break;
    case 'borderPink':
      bgColor = theme.menuColors.pink;
      border = `solid 10px ${theme.menuColors.borderPink}`;
      break;
    case 'borderGreen':
      bgColor = theme.menuColors.green;
      border = `solid 10px ${theme.menuColors.borderGreen}`;
      break;
    default:
      bgColor = theme.colors.mainBlue;
  }

  return (
    <StyledMenu $bgColor={bgColor} $border={border}>
      <MenuText>{buttonText}</MenuText>
    </StyledMenu>
  );
}

export default Menu;
