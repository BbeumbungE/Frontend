import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface ProgressBarProps {
  durationInSeconds: number;
}

interface ProgressBarInnerProps {
  progress: number;
  isRed: boolean;
}

const progressAnimation = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
`;

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #ffefc6;
`;

const ProgressBarInner = styled.div<ProgressBarInnerProps>`
  height: 30px;
  background-color: ${(props) =>
    props.isRed ? props.theme.stageColors.mainSalmon : '#ffc64a'};
  transition: width 0.2s ease-in-out;
  animation: ${progressAnimation} ${({ progress }) => progress}s linear;
`;

const RemainSec = styled.span<{ isRed: boolean }>`
  position: absolute;
  font-size: 25px;
  color: ${(props) => (props.isRed ? 'red' : props.theme.colors.mainWhite)};
  ${({ isRed }) =>
    isRed &&
    css`
      animation: ${bounceAnimation} 0.5s ease infinite;
    `};
`;

function ProgressBar({ durationInSeconds }: ProgressBarProps) {
  const [remainingTime, setRemainingTime] = useState<number>(durationInSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [durationInSeconds, remainingTime]);

  // remainingTime이 10초 이하면 프로그레스 바 빨간색으로 변경 및 남은 초 애니메이션 추가
  const isRed = remainingTime <= 10;

  return (
    <ProgressBarWrapper>
      <ProgressBarInner isRed={isRed} progress={durationInSeconds} />
      <RemainSec isRed={isRed}>{remainingTime}초</RemainSec>
    </ProgressBarWrapper>
  );
}

export default ProgressBar;
