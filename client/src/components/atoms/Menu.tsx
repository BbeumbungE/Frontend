import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { StageIdState } from '../../recoil/stage/atom';
import theme from '../../style/theme';
import Button from './Button';
import SoundEffects from '../../sounds/SoundEffects';

interface ButtonProps {
  key?: number;
  buttonText: string;
  color: string;
  svgSrc?: string;
  srcId?: number;
  transparencyButton?: boolean;
}

const StyledMenu = styled(Link)<{
  $bgColor: string;
  $border: string;
  to?: string | null;
}>`
  font-family: 'TmoneyRoundWindExtraBold';
  width: 18.75rem;
  height: 26.875rem;
  position: relative;
  margin: 0.625rem;
  padding-right: 0.3125rem;
  padding-left: 0.3125rem;
  border-radius: 3.125rem;
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
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.mainBlack};
  margin-top: 1.875rem;
  margin-bottom: 1.875rem;
  margin-right: 2.125rem;
  margin-left: 2.125rem;
  line-height: 1.2;
`;

const SvgImage = styled.img`
  position: absolute;
  bottom: -10%;
  right: -10%;
  width: 16.25rem;
  height: 16.25rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  z-index: 100;
`;
const StyledLink = styled(Link)`
  width: 100%;
  height: 50%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  z-index: 101;
`;

const StyledMenuWrapper = styled.div``;

function Menu({
  key,
  buttonText,
  color,
  svgSrc,
  srcId,
  transparencyButton,
}: ButtonProps) {
  const navigate = useNavigate();
  const [stageIdState, setStageIdState] = useRecoilState(StageIdState);
  const { playBtnBright } = SoundEffects();

  const handleDrawingNavigate = () => {
    if (srcId) {
      console.log('이동');
      navigate('/draw/topic');
      setStageIdState((prev) => ({
        ...prev,
        itemId: srcId,
      }));
      playBtnBright();
    }
  };

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
      border = `solid 0.625rem ${theme.menuColors.borderPink}`;
      break;
    case 'borderGreen':
      bgColor = theme.menuColors.green;
      border = `solid 0.625rem ${theme.menuColors.borderGreen}`;
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
      routeUrl = '/draw/topic';
      break;
  }

  console.log('srdId:', srcId);

  return srcId !== 0 && transparencyButton ? (
    <StyledMenu $bgColor={bgColor} $border={border}>
      <MenuText dangerouslySetInnerHTML={{ __html: buttonText }} />
      {svgSrc && <SvgImage src={svgSrc} alt="SVG Image" />}
      {transparencyButton && (
        <ButtonWrapper>
          <StyledLink to={`/board/ranking/${srcId}`}>
            <Button buttonText="랭킹그림 보기" color="transparency" />
          </StyledLink>
          <StyledLink to={`/board/${srcId}`}>
            <Button
              buttonText="모든그림 보기"
              color="transparency"
              onClick={() => navigate(`/board/${srcId}`)}
            />
          </StyledLink>
        </ButtonWrapper>
      )}
    </StyledMenu>
  ) : (
    <StyledMenuWrapper onClick={handleDrawingNavigate}>
      <StyledMenu to={routeUrl} $bgColor={bgColor} $border={border}>
        <MenuText dangerouslySetInnerHTML={{ __html: buttonText }} />
        {svgSrc && <SvgImage src={svgSrc} alt="SVG Image" />}
      </StyledMenu>
    </StyledMenuWrapper>
  );
}

Menu.defaultProps = {
  key: null,
  svgSrc: '',
  transparencyButton: false,
  srcId: 0,
};

export default Menu;
