import styled from 'styled-components';
import Emoji from '../atoms/Emoji';
import EmojiCount from '../atoms/EmojiCount';

interface EmojiBoxProps {
  SmileCount: number;
  WowCount: number;
  SadCount: number;
  SmilePressed: boolean;
  WowPressed: boolean;
  SadPressed: boolean;
  SmileClick: React.MouseEventHandler<HTMLDivElement>;
  WowClick: React.MouseEventHandler<HTMLDivElement>;
  SadClick: React.MouseEventHandler<HTMLDivElement>;
}

const EmojiBoxDiv = styled.div`
  display: flex;
  width: 500px;
  height: 80px;
  align-items: center;
  z-index: 300;
`;

const EmojiBox = ({
  SmileCount,
  WowCount,
  SadCount,
  SmilePressed,
  WowPressed,
  SadPressed,
  SmileClick,
  WowClick,
  SadClick,
}: EmojiBoxProps) => {
  return (
    <EmojiBoxDiv>
      <Emoji emotion="smile" onClick={SmileClick} isPressed={SmilePressed} />
      <EmojiCount count={SmileCount} />
      <Emoji emotion="wow" onClick={WowClick} isPressed={WowPressed} />
      <EmojiCount count={WowCount} />
      <Emoji emotion="sad" onClick={SadClick} isPressed={SadPressed} />
      <EmojiCount count={SadCount} />
    </EmojiBoxDiv>
  );
};

export default EmojiBox;
