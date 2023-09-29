import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ViewRightArrowIcon } from '../../assets/image/etc/ViewRightArrow.svg';

interface ViewRightArrowProps {
  onClick: () => void;
  disabled: boolean | undefined;
}

const StyledViewRightArrow = styled(ViewRightArrowIcon)<ViewRightArrowProps>`
  cursor: pointer;
  margin: 0.3125rem;
  width: 3.75rem;
  height: 3.75rem;

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
