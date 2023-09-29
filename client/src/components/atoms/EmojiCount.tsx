import styled from 'styled-components';
import theme from '../../style/theme';

interface EmojiCountProps {
  count: number;
}

const EmojiSpanDiv = styled.div`
  width: 80px;
  font-size: 40px;
  font-family: 'TmoneyRoundWindExtraBold';
  color: ${theme.colors.mainWhite};
  text-shadow: 0px 0px 5px black;
`;

function EmojiCounter({ count }: EmojiCountProps) {
  let emojiScore = '0';
  if (count < 100) {
    emojiScore = `${count}`;
  } else if (count >= 100) {
    emojiScore = '+99';
  }
  return emojiScore;
}

const EmojiCount = ({ count }: EmojiCountProps) => {
  const emojiScore = EmojiCounter({ count });
  return <EmojiSpanDiv>{emojiScore}</EmojiSpanDiv>;
};

export default EmojiCount;
