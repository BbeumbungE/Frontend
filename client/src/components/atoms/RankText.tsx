import styled from 'styled-components';
import theme from '../../style/theme';

interface RankTextProps {
  ranking: number;
  size: string;
  color: string;
}

const RankSpan = styled.span<{ fontSize: number; fontColor: string }>`
  position: absolute;
  bottom: -15%;
  left: 10%;
  font-family: 'SBAggroB';
  font-size: ${(props) => `${props.fontSize}rem`};
  color: ${(props) => props.fontColor};
  pointer-events: none;
`;

function getFontSize(size: string): number {
  return size === 'large' ? 13.4375 : 6.875;
}

function getFontColor(color: string): string {
  switch (color) {
    case 'dark':
      return theme.colors.mainBlack;
    case 'light':
      return theme.colors.lightGray;
    default:
      return theme.colors.mainBlack;
  }
}

const RankText = ({ ranking, size, color }: RankTextProps) => {
  const fontSize = getFontSize(size);
  const fontColor = getFontColor(color);
  return (
    <RankSpan fontSize={fontSize} fontColor={fontColor}>
      {ranking}
    </RankSpan>
  );
};

export default RankText;
