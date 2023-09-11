import React from 'react';
import styled from 'styled-components';
import ViewLeftArrow from '../atoms/ViewLeftArrow';
import ViewRightArrow from '../atoms/ViewRightArrow';

interface PageChangeButtonProps {
  leftOnClick: React.MouseEventHandler<SVGSVGElement>;
  rightOnClick: React.MouseEventHandler<SVGSVGElement>;
}

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* 너비 조절 */
  position: absolute;
  top: 45%; /* 높이 조절 */
  transform: translateY(-50%);
  z-index: 999; /* 다른 컨텐츠 위에 표시합니다. */
`;

const PageChangeButton = ({
  leftOnClick,
  rightOnClick,
}: PageChangeButtonProps) => {
  return (
    <ButtonDiv>
      <ViewLeftArrow onClick={leftOnClick} />
      <ViewRightArrow onClick={rightOnClick} />
    </ButtonDiv>
  );
};

export default PageChangeButton;
