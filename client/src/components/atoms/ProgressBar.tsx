import { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface ProgressBarInnerProps {
  progress: number;
}

interface ProgressBarProps {
  setTimeIsUp: React.Dispatch<React.SetStateAction<boolean>>;
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
  border-radius: 25px;
`;

const ProgressBarInner = styled.div<ProgressBarInnerProps>`
  height: 30px;
  background-color: #ffc64a;
  transition: width 0.2s ease-in-out;
  animation: ${progressAnimation} ${({ progress }) => progress}s linear;
`;

function ProgressBar({ setTimeIsUp }: ProgressBarProps) {
  const [remainingTime, setRemainingTime] = useState<number>(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(interval);
        setTimeIsUp(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  return (
    <ProgressBarWrapper>
      <ProgressBarInner progress={10} />
    </ProgressBarWrapper>
  );
}

export default ProgressBar;
