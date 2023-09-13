import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ViewLeftArrowIcon } from '../../assets/image/etc/ViewLeftArrow.svg';

interface ViewLeftArrowProps {
  onClick: () => void;
}

const StyledViewLeftArrow = styled(ViewLeftArrowIcon)`
  cursor: pointer;
  margin: 5px;
`;

const ViewLeftArrow = ({ onClick }: ViewLeftArrowProps) => {
  return <StyledViewLeftArrow onClick={onClick} />;
};

export default ViewLeftArrow;
