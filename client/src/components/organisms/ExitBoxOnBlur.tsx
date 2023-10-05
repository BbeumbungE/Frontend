import React from 'react';
import styled from 'styled-components';
import ExitText from '../atoms/ExitText';
import ExitArrow from '../atoms/ExitArrow';

interface ExitBoxProps {
  color: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const ExitBoxDiv = styled.div`
  display: flex;
  width: 14.375rem;
  height: 4.875rem;
  align-items: center;
  cursor: pointer;
`;

const ExitBoxOnBlur = ({ color, onClick }: ExitBoxProps) => {
  return (
    <ExitBoxDiv onClick={onClick}>
      <ExitArrow color={color} />
      <ExitText color={color} />
    </ExitBoxDiv>
  );
};

export default ExitBoxOnBlur;
