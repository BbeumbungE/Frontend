import styled, { keyframes } from 'styled-components';

interface RoundWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  width: string;
  height: string;
  top: string;
  left: string;
  color: string;
}

const moveRight = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(1000%);
  }
`;

const RoundWrapper = styled.div<RoundWrapperProps>`
  display: flex;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  position: absolute;
  top: ${(props) => props.top || 'auto'};
  left: ${(props) => props.left || 'auto'};
  animation: ${moveRight} 30s linear infinite;
`;

const Round = styled.div<{ color: string }>`
  width: 120px;
  height: auto;
  background-color: ${(props) => props.color || '#fff'};
  border-radius: 50%;
  z-index: 10;
  margin-right: -40px;
`;

const WhiteCloud = ({ width, height, top, left, color }: RoundWrapperProps) => {
  return (
    <RoundWrapper
      width={width}
      height={height}
      top={top}
      left={left}
      color={color}
    >
      <Round color={color} />
      <Round color={color} />
      <Round color={color} />
    </RoundWrapper>
  );
};

export default WhiteCloud;
