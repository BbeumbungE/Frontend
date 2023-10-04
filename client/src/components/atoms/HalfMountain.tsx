import styled from 'styled-components';

interface CircleProps extends React.HTMLAttributes<HTMLDivElement> {
  width: string;
  height: string;
  top: string;
  left: string;
  color: string;
}

const Circle = styled.div<CircleProps>`
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  position: absolute;
  top: ${(props) => props.top || 'auto'};
  left: ${(props) => props.left || 'auto'};
  border-radius: 50%;
  background-color: ${(props) => props.color || '#fff'};
`;

const HalfMountain = ({ width, height, top, left, color }: CircleProps) => {
  return (
    <Circle width={width} height={height} top={top} left={left} color={color} />
  );
};

export default HalfMountain;
