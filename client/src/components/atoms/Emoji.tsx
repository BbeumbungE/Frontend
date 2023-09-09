import React from 'react';
import styled from 'styled-components';
import SmileIcon from '../../assets/image/etc/smile.png';
import WowIcon from '../../assets/image/etc/wow.png';
import CryIcon from '../../assets/image/etc/cry.png';

interface EmojiProps {
  emotion: string;
}

const EmojiWrapper = styled.div`
  display: inline-block;
`;

const Emoji = ({ emotion }: EmojiProps) => {
  let EmotionIcon: string;

  switch (emotion) {
    case 'smile':
      EmotionIcon = SmileIcon;
      break;
    case 'wow':
      EmotionIcon = WowIcon;
      break;
    case 'cry':
      EmotionIcon = CryIcon;
      break;
    default:
      EmotionIcon = SmileIcon;
  }

  return (
    <EmojiWrapper>
      <img src={EmotionIcon} alt={emotion} width="75px" height="75px" />
    </EmojiWrapper>
  );
};

export default Emoji;
