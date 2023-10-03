import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ViewRightArrowIcon } from '../../assets/image/etc/ViewRightArrow.svg';
import SoundEffects from '../../sounds/SoundEffects';

interface ViewRightArrowProps {
  onClick: () => void;
  disabled: boolean | undefined;
}

const StyledViewRightArrow = styled(ViewRightArrowIcon)<ViewRightArrowProps>`
  cursor: pointer;
  margin: 0.3125rem;

  ${(props) =>
    props.disabled &&
    css`
      fill: gray;
      cursor: default;
    `}

  width: 7.75rem;
  height: 7.75rem;
`;

const ViewRightArrow = ({ onClick, disabled }: ViewRightArrowProps) => {
  const { playBtnSmall } = SoundEffects();
  const handleClick = () => {
    if (!disabled) {
      playBtnSmall();
      onClick();
    }
  };

  return <StyledViewRightArrow onClick={handleClick} disabled={disabled} />;
};

export default ViewRightArrow;
