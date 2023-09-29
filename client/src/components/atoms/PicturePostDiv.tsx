import styled from 'styled-components';
import theme from '../../style/theme';

interface PicturePostDivProps {
  imgSrc: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const PicturePostDiv = styled.div<PicturePostDivProps>`
  width: 15rem;
  height: 15rem;
  background-image: ${({ imgSrc }) => (imgSrc ? `url(${imgSrc})` : 'none')};
  background-color: ${({ imgSrc }) =>
    imgSrc ? 'transparent' : theme.colors.mainGray};
  background-size: cover;
  background-position: center;
  cursor: ${({ imgSrc }) => (imgSrc ? 'pointer' : 'default')};
  padding: 0;
  border: 0;
  margin: 0.625rem;
`;

const PicturePost = ({ imgSrc = '', onClick }: PicturePostDivProps) => {
  return <PicturePostDiv imgSrc={imgSrc} onClick={onClick} />;
};

export default PicturePost;
