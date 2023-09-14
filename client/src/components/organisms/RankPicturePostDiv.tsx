import styled from 'styled-components';
import PicturePostDiv from '../atoms/PicturePostDiv';
import RankText from '../atoms/RankText';

interface RankPicturePostDivProps {
  rank: number;
  imgSrc: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  color: string;
}

const RankDiv = styled.div`
  width: 240px;
  height: 260px;
  padding: 0;
  border: 0;
  position: relative;
  margin: 10px;
`;

const RankPicurePostDiv = ({
  rank,
  imgSrc = '',
  onClick,
  color,
}: RankPicturePostDivProps) => {
  return (
    <RankDiv>
      <PicturePostDiv imgSrc={imgSrc} onClick={onClick} />
      <RankText ranking={rank} size="small" color={color} />
    </RankDiv>
  );
};

export default RankPicurePostDiv;
