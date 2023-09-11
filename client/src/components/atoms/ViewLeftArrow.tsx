import styled from 'styled-components';
import { ReactComponent as ViewLeftArrowIcon } from '../../assets/image/etc/ViewLeftArrow.svg';

const StyledViewLeftArrow = styled(ViewLeftArrowIcon)`
  cursor: pointer;
`;

const ViewLeftArrow = () => {
  return <StyledViewLeftArrow />;
};

export default ViewLeftArrow;
