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
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  gap: -25px;
`;

const LeftGreenStar = styled.img`
  width: 85.866px;
  height: 84.99px;
  transform: rotate(-6deg);
`;
const RightGreenStar = styled.img`
  width: 85.866px;
  height: 84.99px;
  transform: rotate(6deg);
`;
const MiddleGreenStar = styled.img`
  top: -20px;
  width: 98px;
  height: 97px;
  transform: translateY(-30%);
`;

const LeftGrayStar = styled(GrayStarIcon)`
  width: 85.866px;
  height: 84.99px;
  transform: rotate(-6deg);
`;
const RightGrayStar = styled(GrayStarIcon)`
  width: 85.866px;
  height: 84.99px;
  transform: rotate(6deg);
`;
const MiddleGrayStar = styled(GrayStarIcon)`
  top: -20px;
  width: 98px;
  height: 97px;
  transform: translateY(-30%);
`;

interface LevelStarsProps {
  star: number | null;
}

function LevelStars({ star }: LevelStarsProps) {
  const stars = [];

  if (star === null) {
    stars.push(<LeftGrayStar />);
    stars.push(<MiddleGrayStar />);
    stars.push(<RightGrayStar />);
  } else if (star === 1) {
    stars.push(<LeftGreenStar src={GreenStarIcon} alt="Left Star" />);
    stars.push(<MiddleGrayStar />);
    stars.push(<RightGrayStar />);
  } else if (star === 2) {
    stars.push(<LeftGreenStar src={GreenStarIcon} alt="Left Star" />);
    stars.push(<MiddleGreenStar src={GreenStarIcon} alt="Left Star" />);
    stars.push(<RightGrayStar />);
  } else if (star === 3) {
    stars.push(<LeftGreenStar src={GreenStarIcon} alt="Left Star" />);
    stars.push(<MiddleGreenStar src={GreenStarIcon} alt="Left Star" />);
    stars.push(<RightGreenStar src={GreenStarIcon} alt="Left Star" />);
  }

  return <StarWrapper>{stars}</StarWrapper>;
}

export default LevelStars;
