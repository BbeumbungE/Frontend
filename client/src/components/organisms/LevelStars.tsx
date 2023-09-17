import React from 'react';
import styled from 'styled-components';
import { ReactComponent as GreenStar } from '../../assets/image/etc/greenStar.svg';
import { ReactComponent as GrayStar } from '../../assets/image/etc/grayStar.svg';

const StarWrapper = styled.span`
  display: inline-block;
`;

interface LevelStarsProps {
  level: number;
}

function LevelStars({ level }: LevelStarsProps) {
  const stars = [];

  for (let i = 0; i < level; i++) {
    stars.push(<GreenStar key={`green-star-${i}`} />);
  }

  for (let i = level; i < 3; i++) {
    stars.push(<GrayStar key={`gray-star-${i}`} />);
  }

  return <StarWrapper>{stars}</StarWrapper>;
}

export default LevelStars;
