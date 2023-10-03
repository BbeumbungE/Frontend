import styled, { keyframes } from 'styled-components';
import LevelStars from './LevelStars';
import { ReactComponent as questionMarkIcon } from '../../assets/image/etc/questionMark.svg';

interface LevelBtnProps {
  level: number;
  bottom: number;
  right: number;
}

const QuestionIcon = styled(questionMarkIcon)`
  width: 9.375rem;
  height: 9.375rem;
  position: absolute;
  top: -9.375rem;
  left: 1.75rem;
  z-index: 200;
  filter: brightness(0.7);
`;

const LevelWrapper = styled.div`
  position: fixed;
  width: 12.5rem;
  height: 9rem;
  margin: 0.625rem;
`;

const LevelText = styled.span`
  color: #97560d;
  font-family: SBAggroB;
  font-size: 5rem;
  font-style: normal;
  font-weight: 400;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  text-shadow: 0rem -0.0625rem 0.1875rem #23232380;
  filter: brightness(0.5);
`;

const TopBtn = styled.div`
  width: 10.625rem;
  height: 7.1875rem;
  border-radius: 50%;
  background: #fbee15;
  box-shadow:
    0rem -0.6875rem 0.25rem 0rem rgba(0, 0, 0, 0.25) inset,
    0.3125rem 0.5625rem 0.6875rem 0rem rgba(255, 255, 255, 0.5) inset;
  position: absolute;
  top: -5%;
  left: 7%;
  z-index: 2;
  filter: brightness(0.5);
`;

const BottomBtn = styled.div`
  width: 12.5rem;
  height: 8.1875rem;
  border-radius: 50%;
  background: #e7eaf8;
  box-shadow:
    0rem -0.625rem 0.25rem 0rem rgba(0, 0, 0, 0.25) inset,
    0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 1;
  filter: brightness(0.5);
`;

const EmptyLevelBtn = ({ level, bottom, right }: LevelBtnProps) => {
  return (
    <LevelWrapper
      style={{ bottom: `${bottom || 0}rem`, right: `${right || 0}rem` }}
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
