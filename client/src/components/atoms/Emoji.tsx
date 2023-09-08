import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SmileIcon } from '../../assets/image/etc/smile.svg';
import { ReactComponent as WowIcon } from '../../assets/image/etc/wow.svg';
import { ReactComponent as CryIcon } from '../../assets/image/etc/cry.svg';

interface EmojiProps {
  emotion: string;
}

const EmojiWrapper = styled.div`
  display: inline-block;
`;

const Emoji = ({ emotion }: EmojiProps) => {
  let EmotionIcon: React.FC;

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
      <EmotionIcon />
    </EmojiWrapper>
  );
};

export default Emoji;
