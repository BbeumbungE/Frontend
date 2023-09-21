import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ViewRightArrowIcon } from '../../assets/image/etc/ViewRightArrow.svg';

interface ViewRightArrowProps {
  onClick: () => void;
  disabled: boolean | undefined;
}

const StyledViewRightArrow = styled(ViewRightArrowIcon)<ViewRightArrowProps>`
  cursor: pointer;
  margin: 5px;
  width: 60px;
  height: 60px;

  ${(props) =>
    props.disabled &&
    css`
      fill: gray;
      cursor: default;
    `}
`;

const ViewRightArrow = ({ onClick, disabled }: ViewRightArrowProps) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return <StyledViewRightArrow onClick={handleClick} disabled={disabled} />;
};

export default ViewRightArrow;
