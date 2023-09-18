import React from 'react';
import styled from 'styled-components';
import GreenStarIcon from '../../assets/image/etc/greenStar.png';
import { ReactComponent as GrayStarIcon } from '../../assets/image/etc/grayStar.svg';

const StarWrapper = styled.span`
  position: absolute;
  bottom: 250px;
  width: 270px;
  height: 120px;
  z-index: 300;
`;

const LeftGreenStar = styled.img`
  position: absolute;
  left: 0;
  width: 85.866px;
  height: 84.99px;
  transform: rotate(-6deg);
`;
const RightGreenStar = styled.img`
  position: absolute;
  left: 140px;
  width: 85.866px;
  height: 84.99px;
  transform: rotate(6deg);
`;
const MiddleGreenStar = styled.img`
  position: absolute;
  left: 65px;
  top: -20px;
  width: 98px;
  height: 97px;
`;

const LeftGrayStar = styled(GrayStarIcon)`
  position: absolute;
  left: 0;
  width: 85.866px;
  height: 84.99px;
  transform: rotate(-6deg);
`;
const RightGrayStar = styled(GrayStarIcon)`
  position: absolute;
  left: 140px;
  width: 85.866px;
  height: 84.99px;
  transform: rotate(6deg);
`;
const MiddleGrayStar = styled(GrayStarIcon)`
  position: absolute;
  left: 65px;
  top: -20px;
  width: 98px;
  height: 97px;
`;

interface LevelStarsProps {
  level: number | null;
}

function LevelStars({ level }: LevelStarsProps) {
  const stars = [];

  if (level === null) {
    stars.push(<LeftGrayStar />);
    stars.push(<MiddleGrayStar />);
    stars.push(<RightGrayStar />);
  } else if (level === 1) {
    stars.push(<LeftGreenStar src={GreenStarIcon} alt="Left Star" />);
    stars.push(<MiddleGrayStar />);
    stars.push(<RightGrayStar />);
  } else if (level === 2) {
    stars.push(<LeftGreenStar src={GreenStarIcon} alt="Left Star" />);
    stars.push(<MiddleGreenStar src={GreenStarIcon} alt="Left Star" />);
    stars.push(<RightGrayStar />);
  } else if (level === 3) {
    stars.push(<LeftGreenStar src={GreenStarIcon} alt="Left Star" />);
    stars.push(<MiddleGreenStar src={GreenStarIcon} alt="Left Star" />);
    stars.push(<RightGreenStar src={GreenStarIcon} alt="Left Star" />);
  }

  return <StarWrapper>{stars}</StarWrapper>;
}

export default LevelStars;
