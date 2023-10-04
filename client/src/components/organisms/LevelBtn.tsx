import styled, { keyframes } from 'styled-components';
import LevelStars from './LevelStars';
import SoundEffects from '../../sounds/SoundEffects';

interface LevelBtnProps {
  level: number;
  star: null | number;
  bottom: number;
  right: number;
  imgSrc: string;
  onClick?: () => void;
}

const hoverAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.9375rem);
  }
  100% {
    transform: translateY(0);
  }
`;

const LevelWrapper = styled.div`
  position: fixed;
  width: 12.5rem;
  height: 9rem;
  margin: 0.625rem;
  cursor: pointer;

  &:hover {
    animation: ${hoverAnimation} 1s ease-in-out;
  }
`;

const LevelSketch = styled.img`
  width: 12.5rem;
  height: 11.25rem;
  position: absolute;
  top: -8.125rem;
  left: 0%;
  z-index: 200;
  border: none !important;
  outline: none;
  padding: 0;
  margin: 0;
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
`;

const LevelBtn = ({
  level,
  star,
  bottom,
  right,
  imgSrc,
  onClick,
}: LevelBtnProps) => {
  const { playBtnSmall2 } = SoundEffects();
  const handleClick = () => {
    playBtnSmall2(); // 버튼 클릭시 효과음 실행
    if (onClick) {
      onClick(); // 만약 외부에서 전달된 onClick 핸들러가 있다면 실행
    }
  };
  return (
    <LevelWrapper
      style={{ bottom: `${bottom || 0}rem`, right: `${right || 0}rem` }}
      onClick={handleClick}
    >
      <LevelStars star={star} />
      <LevelSketch src={imgSrc} />
      <LevelText>{level}</LevelText>
      <TopBtn />
      <BottomBtn />
    </LevelWrapper>
  );
};

LevelBtn.defaultProps = {
  onClick: undefined, // 기본값으로 빈 함수를 설정
};

export default LevelBtn;
