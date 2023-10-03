import React from 'react';
import styled from 'styled-components';
import GreenStarIcon from '../../assets/image/etc/greenStar.png';
import { ReactComponent as GrayStarIcon } from '../../assets/image/etc/grayStar.svg';

const StarWrapper = styled.span`
  position: absolute;
  bottom: 15.625rem;
  width: 16.875rem;
  height: 7.5rem;
  z-index: 300;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 1.25rem;
`;

const LeftGreenStar = styled.img`
  width: 5.3666rem;
  height: 5.3119rem;
  transform: rotate(-6deg);
  margin-right: -0.9375rem;
`;
const RightGreenStar = styled.img`
  width: 5.3666rem;
  height: 5.3119rem;
  transform: rotate(6deg);
  margin-left: -0.9375rem;
`;
const MiddleGreenStar = styled.img`
  top: -1.25rem;
  width: 6.125rem;
  height: 6.0625rem;
  transform: translateY(-30%);
`;

const LeftGrayStar = styled(GrayStarIcon)`
  width: 5.3666rem;
  height: 5.3119rem;
  transform: rotate(-6deg);
  margin-right: -0.9375rem;
`;
const RightGrayStar = styled(GrayStarIcon)`
  width: 5.3666rem;
  height: 5.3119rem;
  transform: rotate(6deg);
  margin-left: -0.9375rem;
`;
const MiddleGrayStar = styled(GrayStarIcon)`
  top: -1.25rem;
  width: 6.125rem;
  height: 6.0625rem;
  transform: translateY(-30%);
`;

interface LevelStarsProps {
  star: number | null;
}

function LevelStars({ star }: LevelStarsProps) {
  const stars = [];

  if (star === null) {
    stars.push(<LeftGrayStar key="left" />);
    stars.push(<MiddleGrayStar key="middle" />);
    stars.push(<RightGrayStar key="right" />);
  } else if (star === 1) {
    stars.push(
      <LeftGreenStar key="left" src={GreenStarIcon} alt="Left Star" />,
    );
    stars.push(<MiddleGrayStar key="middle" />);
    stars.push(<RightGrayStar key="right" />);
  } else if (star === 2) {
    stars.push(
      <LeftGreenStar key="left" src={GreenStarIcon} alt="Left Star" />,
    );
    stars.push(
      <MiddleGreenStar key="middle" src={GreenStarIcon} alt="Left Star" />,
    );
    stars.push(<RightGrayStar key="right" />);
  } else if (star === 3) {
    stars.push(
      <LeftGreenStar key="left" src={GreenStarIcon} alt="Left Star" />,
    );
    stars.push(
      <MiddleGreenStar key="middle" src={GreenStarIcon} alt="Left Star" />,
    );
    stars.push(
      <RightGreenStar key="right" src={GreenStarIcon} alt="Left Star" />,
    );
  }

  return <StarWrapper>{stars}</StarWrapper>;
}

export default LevelStars;
