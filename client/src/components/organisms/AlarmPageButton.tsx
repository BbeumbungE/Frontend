import React from 'react';
import styled from 'styled-components';
import SmallViewLeftArrow from '../atoms/SmallViewLeftArrow';
import SmallViewRightArrow from '../atoms/SmallViewRightArrow';

interface PageChangeButtonProps {
  leftOnClick: () => void;
  rightOnClick: () => void;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 39.375rem;
  top: 50%;
  position: absolute;
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
        <SmallViewLeftArrow onClick={leftOnClick} disabled={leftDisabled} />
      </PointableSpace>
      <PointableSpace>
        <SmallViewRightArrow onClick={rightOnClick} disabled={rightDisabled} />
      </PointableSpace>
    </ButtonDiv>
  );
};

PageChangeButton.defaultProps = {
  leftDisabled: false,
  rightDisabled: false,
};

export default PageChangeButton;
