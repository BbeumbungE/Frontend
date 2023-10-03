import React from 'react';
import styled from 'styled-components';
import SmileIcon from '../../assets/image/etc/smile.png';
import WowIcon from '../../assets/image/etc/wow.png';
import CryIcon from '../../assets/image/etc/cry.png';
import SoundEffects from '../../sounds/SoundEffects';

interface EmojiProps {
  emotion: string;
  isPressed: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const EmojiWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  z-index: 300;
  margin-right: 0.1875rem;
`;

const Emoji = ({ emotion, onClick, isPressed }: EmojiProps) => {
  const { playBtnBright2 } = SoundEffects();
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    playBtnBright2();
    if (onClick) {
      onClick(event);
    }
  };
  let EmotionIcon: string;
  switch (emotion) {
    case 'smile':
      EmotionIcon = SmileIcon;
      break;
    case 'wow':
      EmotionIcon = WowIcon;
      break;
    case 'sad':
      EmotionIcon = CryIcon;
      break;
    default:
      EmotionIcon = SmileIcon;
  }

  return (
    <EmojiWrapper onClick={handleClick}>
      <img
        src={EmotionIcon}
        alt={emotion}
        width="75px"
        height="75px"
        style={{ filter: isPressed ? '' : 'grayscale(100%)' }}
      />
    </EmojiWrapper>
  );
};

export default Emoji;
