import styled from 'styled-components';
import theme from '../../style/theme';

interface DetailPicturePostDivProps {
  imgSrc?: string;
}

const DetailPicturePostDiv = styled.div<DetailPicturePostDivProps>`
  width: 664px;
  height: 664px;
  background-image: ${({ imgSrc }) => (imgSrc ? `url(${imgSrc})` : 'none')};
  background-color: ${({ imgSrc }) =>
    imgSrc ? 'transparent' : theme.colors.darkGray};
  background-size: cover;
  background-position: center;
  padding: 0;
  border: 0;
  z-index: 200;
`;

export default DetailPicturePostDiv;
