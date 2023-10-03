import styled from 'styled-components';
import theme from '../../style/theme';
import { ReactComponent as ArrowIcon } from '../../assets/image/etc/arrow.svg';

interface ArrowProps {
  color: string;
}

const StyledArrowIcon = styled(ArrowIcon)<{ $bgColor: string }>`
  path {
    fill: ${(props) => props.$bgColor};
  }
  cursor: pointer;
  width: 8.1875rem;
  height: 8.1875rem;
`;
function Arrow({ color }: ArrowProps) {
  let bgColor = theme.colors.darkGray;

  switch (color) {
    case 'dark':
      bgColor = theme.colors.darkGray;
      break;
    case 'light':
      bgColor = theme.colors.mainWhite;
      break;
    default:
      bgColor = theme.colors.darkGray;
  }
  return bgColor;
}
const ExitArrow = ({ color }: ArrowProps) => {
  const bgColor = Arrow({ color });
  return <StyledArrowIcon $bgColor={bgColor} />;
};

export default ExitArrow;
