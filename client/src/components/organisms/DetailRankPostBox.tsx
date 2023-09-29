import React from 'react';
import styled from 'styled-components';
import DetailPicturePostDiv from '../atoms/DetailPicturePostDiv';
import EmojiBox from './EmojiBox';
import RankText from '../atoms/RankText';

// 감정표현 개수, 감정표현 눌렀는지, 어떤 그림의 상세인지
interface DetailPostBoxProps {
  SmileCount: number;
  WowCount: number;
  SadCount: number;
  SmilePressed: boolean;
  WowPressed: boolean;
  SadPressed: boolean;
  SmileClick: React.MouseEventHandler<HTMLDivElement>;
  WowClick: React.MouseEventHandler<HTMLDivElement>;
  SadClick: React.MouseEventHandler<HTMLDivElement>;
  imgsrc: string;
  ranking: number;
}
const CenterDiv = styled.div`
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;
`;

const DetailPostBoxDiv = styled.div`
  width: 577px;
  height: 600px;
  padding: 0;
  border: 0;
  position: relative;
`;

const EmojiWrapperDiv = styled.div`
  position: relative;
  width: 550px;
  bottom: 7%;
  left: 27%;
`;

const RankTextWrapperDiv = styled.div`
  position: absolute;
  bottom: -5%;
  left: 0%;
  width: 2px;
`;

const DetailPostBox = ({
  SmileCount,
  WowCount,
  SadCount,
  SmilePressed,
  WowPressed,
  SadPressed,
  SmileClick,
  WowClick,
  SadClick,
  imgsrc,
  ranking,
}: DetailPostBoxProps) => {
  return (
    <CenterDiv>
      <DetailPostBoxDiv>
        <DetailPicturePostDiv imgSrc={imgsrc} />
        <RankTextWrapperDiv>
          <RankText ranking={ranking} size="large" color="light" />
        </RankTextWrapperDiv>
        <EmojiWrapperDiv>
          <EmojiBox
            SmileCount={SmileCount}
            WowCount={WowCount}
            SadCount={SadCount}
            SmilePressed={SmilePressed}
            WowPressed={WowPressed}
            SadPressed={SadPressed}
            SmileClick={SmileClick}
            WowClick={WowClick}
            SadClick={SadClick}
          />
        </EmojiWrapperDiv>
      </DetailPostBoxDiv>
    </CenterDiv>
  );
};

export default DetailPostBox;
