import styled from 'styled-components';
import theme from '../../style/theme';

interface PageHeaderTextProps {
  content: string;
  color: string;
  fontSize: string; // fontSize 추가
}

const PageHeaderSpan = styled.span<{ $txColor: string; fontSize?: string }>`
  font-size: ${(props) =>
    props.fontSize ||
    '5.625rem'}; // fontSize를 props로 받거나 기본값은 '5.625rem'
  font-family: 'TmoneyRoundWindExtraBold';
  color: ${(props) => props.$txColor};
  text-align: center;
  margin-bottom: 0.1875rem;
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

const PageHeaderText = ({ color, content, fontSize }: PageHeaderTextProps) => {
  const txColor = SpanColor(color); // SpanColor 함수 호출
  return (
    <PageHeaderSpan $txColor={txColor} fontSize={fontSize}>
      {content}
    </PageHeaderSpan>
  );
};

export default PageHeaderText;
