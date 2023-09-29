import styled from 'styled-components';
import ViewLeftArrow from '../atoms/ViewLeftArrow';
import ViewRightArrow from '../atoms/ViewRightArrow';

interface PageChangeButtonProps {
  leftOnClick: () => void;
  rightOnClick: () => void;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}

const ButtonDiv = styled.div`
  display: flex;
  position: relative;
  z-index: 400;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const PointableSpace = styled.div`
  border: 0rem;
  margin: 0rem;
  pointer-events: auto;
`;

const PageChangeButton = ({
  leftOnClick,
  rightOnClick,
  leftDisabled,
  rightDisabled,
}: PageChangeButtonProps) => {
  return (
    <ButtonDiv>
      <PointableSpace>
        <ViewLeftArrow onClick={leftOnClick} disabled={leftDisabled} />
      </PointableSpace>
      <PointableSpace>
        <ViewRightArrow onClick={rightOnClick} disabled={rightDisabled} />
      </PointableSpace>
    </ButtonDiv>
  );
};

PageChangeButton.defaultProps = {
  leftDisabled: false,
  rightDisabled: false,
};

export default PageChangeButton;
