import styled from 'styled-components';
import theme from '../../style/theme';

interface PicturePostDivProps {
  imgSrc?: string;
}

const PicturePostDiv = styled.div<PicturePostDivProps>`
  width: 315px;
  height: 315px;
  background-image: ${({ imgSrc }) => (imgSrc ? `url(${imgSrc})` : 'none')};
  background-color: ${({ imgSrc }) =>
    imgSrc ? 'transparent' : theme.colors.darkGray};
  background-size: cover;
  background-position: center;
  cursor: ${({ imgSrc }) => (imgSrc ? 'pointer' : 'default')};
  padding: 0;
  border: 0;
`;

export default PicturePostDiv;
