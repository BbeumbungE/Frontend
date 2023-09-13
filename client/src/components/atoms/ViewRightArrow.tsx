import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ViewRightArrowIcon } from '../../assets/image/etc/ViewRightArrow.svg';

interface ViewRightArrowProps {
  onClick: () => void;
}

const StyledViewRightArrow = styled(ViewRightArrowIcon)`
  cursor: pointer;
  margin: 5px;
`;

const ViewRightArrow = ({ onClick }: ViewRightArrowProps) => {
  return <StyledViewRightArrow onClick={onClick} />;
};

export default ViewRightArrow;
