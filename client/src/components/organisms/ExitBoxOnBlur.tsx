import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ExitText from '../atoms/ExitText';
import ExitArrow from '../atoms/ExitArrow';

interface ExitBoxProps {
  color: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const ExitBoxDiv = styled.div`
  display: flex;
  width: 230px;
  height: 78px;
  align-items: center;
  cursor: pointer;
`;

const ExitBox = ({ color, onClick }: ExitBoxProps) => {
  return (
    <ExitBoxDiv onClick={onClick}>
      <ExitArrow color={color} />
      <ExitText color={color} />
    </ExitBoxDiv>
  );
};

export default ExitBox;
