import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ExitText from '../atoms/ExitText';
import ExitArrow from '../atoms/ExitArrow';

interface ExitBoxProps {
  color: string;
  closeModal?: () => void;
}

const ExitBoxDiv = styled.span`
  display: flex;
  width: 14.375rem;
  height: 4.875rem;
  align-items: center;
  cursor: pointer;
  position: fixed;
  top: 3%;
  left: 0%;
  z-index: 550;
`;

const ExitBox = ({ color, closeModal }: ExitBoxProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (closeModal) {
      console.log('모달 닫기');
      closeModal();
    } else {
      navigate(-1);
    }
  };

  return (
    <ExitBoxDiv onClick={handleClick}>
      <ExitArrow color={color} />
      <ExitText color={color} />
    </ExitBoxDiv>
  );
};

ExitBox.defaultProps = {
  closeModal: undefined,
};

export default ExitBox;
