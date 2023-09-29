import styled from 'styled-components';
import theme from '../../style/theme';

interface ExitTextProps {
  color: string;
}

const ExitSpan = styled.span<{ $txColor: string }>`
  font-size: 1.5625rem;
  font-family: 'TmoneyRoundWindExtraBold';
  color: ${(props) => props.$txColor};
  cursor: pointer;
`;

function SpanColor({ color }: ExitTextProps) {
  let txColor = theme.colors.darkGray;

  switch (color) {
    case 'dark':
      txColor = theme.colors.darkGray;
      break;
    case 'light':
      txColor = theme.colors.mainWhite;
      break;
    default:
      txColor = theme.colors.darkGray;
  }

  return txColor; // 색상을 반환
}

const ExitText = ({ color }: ExitTextProps) => {
  const txColor = SpanColor({ color }); // SpanColor 함수 호출
  return <ExitSpan $txColor={txColor}>나가기</ExitSpan>;
};

export default ExitText;
