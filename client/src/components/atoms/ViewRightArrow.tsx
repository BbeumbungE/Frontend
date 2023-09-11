import styled from 'styled-components';
import { ReactComponent as ViewRightArrowIcon } from '../../assets/image/etc/ViewRightArrow.svg';

const StyledViewRightArrow = styled(ViewRightArrowIcon)`
  cursor: pointer;
`;

const ViewRightArrow = () => {
  return <StyledViewRightArrow />;
};

export default ViewRightArrow;
