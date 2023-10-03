import styled from 'styled-components';
import theme from '../../style/theme';

interface DetailPicturePostDivProps {
  imgSrc?: string;
}

const DetailPicturePostDiv = styled.div<DetailPicturePostDivProps>`
  width: 577px;
  height: 577px;
  background-image: ${({ imgSrc }) => (imgSrc ? `url(${imgSrc})` : 'none')};
  background-color: ${({ imgSrc }) =>
    imgSrc ? 'transparent' : theme.colors.darkGray};
  background-size: cover;
  background-position: center;
  padding: 0;
  border: 0;
  z-index: 500;
`;

export default DetailPicturePostDiv;
