import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface ProgressBarProps {
  durationInSeconds: number;
}

interface ProgressBarInnerProps {
  progress: number;
}

const progressAnimation = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 5px;
`;

const ProgressBarInner = styled.div<ProgressBarInnerProps>`
  height: 30px;
  border-radius: 25px;
  border: 1.3px solid #ffffff;
  background-color: ${'#ffc64a'};
  transition: width 0.2s ease-in-out;
  animation: ${progressAnimation} ${({ progress }) => progress}s linear;
`;

function ProgressBarWithoutRed({ durationInSeconds }: ProgressBarProps) {
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

  return (
    <ProgressBarWrapper>
      <ProgressBarInner progress={durationInSeconds} />
    </ProgressBarWrapper>
  );
}

export default ProgressBarWithoutRed;
