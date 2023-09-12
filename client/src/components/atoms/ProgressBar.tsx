import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// CSS keyframes로 애니메이션 정의
const progressAnimation = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  background-color: #ddd;
`;

const ProgressBarInner = styled.div<{ progress: number }>`
  height: 30px;
  width: ${({ progress }) => progress}%;
  background-color: #007bff;
  transition: width 0.2s ease-in-out;
  animation: ${progressAnimation} ${({ progress }) => progress * 0.01 * 1.5}s
    linear; // 애니메이션 적용
`;

interface ProgressBarProps {
  durationInSeconds: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ durationInSeconds }) => {
  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress > 0) {
        setProgress((prevProgress) => prevProgress - 100 / durationInSeconds);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [durationInSeconds, progress]);

  return (
    <ProgressBarWrapper>
      <ProgressBarInner progress={progress} />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
