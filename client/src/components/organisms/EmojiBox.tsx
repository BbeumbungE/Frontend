import styled from 'styled-components';
import Emoji from '../atoms/Emoji';
import EmojiCount from '../atoms/EmojiCount';

interface EmojiBoxProps {
  SmileCount: number;
  WowCount: number;
  SadCount: number;
}

const EmojiBoxDiv = styled.div`
  display: flex;
  width: 500px;
  height: 80px;
  align-items: center;
  z-index: 300;
`;

const EmojiBox = ({ SmileCount, WowCount, SadCount }: EmojiBoxProps) => {
  return (
    <EmojiBoxDiv>
      <Emoji emotion="smile" />
      <EmojiCount count={SmileCount} />
      <Emoji emotion="wow" />
      <EmojiCount count={WowCount} />
      <Emoji emotion="sad" />
      <EmojiCount count={SadCount} />
    </EmojiBoxDiv>
  );
};

export default EmojiBox;
