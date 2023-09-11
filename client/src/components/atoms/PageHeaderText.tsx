import styled from 'styled-components';
import theme from '../../style/theme';

interface PageHeaderTextProps {
  content: string;
  color: string;
}

const PageHeaderSpan = styled.span<{ txColor: string }>`
  font-size: 90px;
  font-family: 'TmoneyRoundWindExtraBold';
  color: ${(props) => props.txColor};
  text-align: center;
`;

function SpanColor(color: string) {
  let txColor = theme.colors.mainBlack;

  switch (color) {
    case 'dark':
      txColor = theme.colors.mainBlack;
      break;
    case 'light':
      txColor = theme.colors.mainWhite;
      break;
    default:
      txColor = theme.colors.mainBlack;
  }

  return txColor; // 색상을 반환
}

const PageHeaderText = ({ color, content }: PageHeaderTextProps) => {
  const txColor = SpanColor(color); // SpanColor 함수 호출
  return <PageHeaderSpan txColor={txColor}>{content}</PageHeaderSpan>;
};

export default PageHeaderText;
