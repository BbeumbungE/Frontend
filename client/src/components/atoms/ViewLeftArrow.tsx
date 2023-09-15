import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ViewLeftArrowIcon } from '../../assets/image/etc/ViewLeftArrow.svg';

interface ViewLeftArrowProps {
  onClick: () => void;
  disabled: boolean | undefined;
}

const StyledViewLeftArrow = styled(ViewLeftArrowIcon)<ViewLeftArrowProps>`
  cursor: pointer;
  margin: 5px;

  ${(props) =>
    props.disabled &&
    css`
      fill: gray;
      cursor: default;
    `}
`;

const ViewLeftArrow = ({ onClick, disabled }: ViewLeftArrowProps) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return <StyledViewLeftArrow onClick={handleClick} disabled={disabled} />;
};

export default ViewLeftArrow;
