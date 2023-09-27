import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ExitText from '../atoms/ExitText';
import ExitArrow from '../atoms/ExitArrow';

interface ExitBoxProps {
  color: string;
}

const ExitBoxDiv = styled.span`
  display: flex;
  width: 14.375rem;
  height: 4.875rem;
  align-items: center;
  cursor: pointer;
`;

const ExitBox = ({ color }: ExitBoxProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <ExitBoxDiv onClick={goBack}>
      <ExitArrow color={color} />
      <ExitText color={color} />
    </ExitBoxDiv>
  );
};

export default ExitBox;
