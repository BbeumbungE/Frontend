import styled, { keyframes } from 'styled-components';
import LevelStars from './LevelStars';
import { ReactComponent as questionMarkIcon } from '../../assets/image/etc/questionMark.svg';

interface LevelBtnProps {
  level: number;
  bottom: number;
  right: number;
}

const QuestionIcon = styled(questionMarkIcon)`
  width: 150px;
  height: 150px;
  position: absolute;
  top: -150px;
  left: 28px;
  z-index: 200;
  filter: brightness(0.7);
`;

const LevelWrapper = styled.div`
  position: fixed;
  width: 200px;
  height: 144px;
  margin: 10px;
`;

const LevelText = styled.span`
  color: #97560d;
  font-family: SBAggroB;
  font-size: 80px;
  font-style: normal;
  font-weight: 400;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  text-shadow: 0px -1px 3px #23232380;
  filter: brightness(0.5);
`;

const TopBtn = styled.div`
  width: 170px;
  height: 115px;
  border-radius: 50%;
  background: #fbee15;
  box-shadow:
    0px -11px 4px 0px rgba(0, 0, 0, 0.25) inset,
    5px 9px 11px 0px rgba(255, 255, 255, 0.5) inset;
  position: absolute;
  top: -5%;
  left: 7%;
  z-index: 2;
  filter: brightness(0.5);
`;

const BottomBtn = styled.div`
  width: 200px;
  height: 131px;
  border-radius: 50%;
  background: #e7eaf8;
  box-shadow:
    0px -10px 4px 0px rgba(0, 0, 0, 0.25) inset,
    0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 1;
  filter: brightness(0.5);
`;

const EmptyLevelBtn = ({ level, bottom, right }: LevelBtnProps) => {
  return (
    <LevelWrapper
      style={{ bottom: `${bottom || 0}px`, right: `${right || 0}px` }}
    >
      <LevelStars star={null} />
      <QuestionIcon />
      <LevelText>{level}</LevelText>
      <TopBtn />
      <BottomBtn />
    </LevelWrapper>
  );
};

export default EmptyLevelBtn;
