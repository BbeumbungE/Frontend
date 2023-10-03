import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ViewLeftArrowIcon } from '../../assets/image/etc/ViewLeftArrow.svg';
import SoundEffects from '../../sounds/SoundEffects';

interface ViewLeftArrowProps {
  onClick: () => void;
  disabled: boolean | undefined;
}

const StyledViewLeftArrow = styled(ViewLeftArrowIcon)<ViewLeftArrowProps>`
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

const ViewLeftArrow = ({ onClick, disabled }: ViewLeftArrowProps) => {
  const { playBtnSmall } = SoundEffects();
  const handleClick = () => {
    if (!disabled) {
      playBtnSmall();
      onClick();
    }
  };

  return <StyledViewLeftArrow onClick={handleClick} disabled={disabled} />;
};

export default ViewLeftArrow;
