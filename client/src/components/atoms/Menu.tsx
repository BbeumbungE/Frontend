import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import theme from '../../style/theme';

interface ButtonProps {
  key?: number;
  buttonText: string;
  color: string;
  svgSrc?: string;
}

const StyledMenu = styled(NavLink)<{ $bgColor: string; $border: string }>`
  font-family: 'TmoneyRoundWindExtraBold';
  width: 300px;
  height: 430px;
  position: relative;
  margin: 10px;
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.$bgColor};
  border: ${(props) => props.$border};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: left;
  overflow-wrap: break-word;
  overflow: hidden;
`;

const MenuText = styled.div`
  font-size: 40px;
  color: ${(props) => props.theme.colors.mainBlack};
  margin-top: 30px;
  margin-bottom: 30px;
  margin-right: 34px;
  margin-left: 34px;
  line-height: 1.2;
`;

const SvgImage = styled.img`
  position: absolute;
  bottom: -10%;
  right: -10%;
  width: 260px;
  height: 260px;
`;

function Menu({ key, buttonText, color, svgSrc }: ButtonProps) {
  let bgColor = theme.menuColors.pink; // 기본값은 mainBlue
  let border = 'none';
  let routeUrl = '';

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

  // 원하는 경로로 이동
  switch (buttonText) {
    case '주제별<br />그리기':
      routeUrl = '/menu/draw';
      break;
    case '단계별<br />그리기':
      routeUrl = '/stage';
      break;
    case '그림<br />보러가기':
      routeUrl = '/menu/view';
      break;
    case '상점':
      routeUrl = '/store';
      break;
    default:
      routeUrl = '/';
      break;
  }

  return (
    <StyledMenu to={routeUrl} $bgColor={bgColor} $border={border}>
      <MenuText dangerouslySetInnerHTML={{ __html: buttonText }} />
      {svgSrc && <SvgImage src={svgSrc} alt="SVG Image" />}
    </StyledMenu>
  );
}

Menu.defaultProps = {
  key: null,
  svgSrc: '',
};

export default Menu;
