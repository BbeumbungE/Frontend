import React from 'react';
import styled from 'styled-components';
import DetailPicturePostDiv from '../atoms/DetailPicturePostDiv';
import EmojiBox from './EmojiBox';

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
`;

const EmojiWrapperDiv = styled.div`
  position: relative;
  width: 550px;
  bottom: 7%;
  left: 27%;
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
}: DetailPostBoxProps) => {
  return (
    <CenterDiv>
      <DetailPostBoxDiv>
        <DetailPicturePostDiv imgSrc={imgsrc} />
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
