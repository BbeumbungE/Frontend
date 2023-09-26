import { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { UserProfileState } from '../recoil/profile/atom';
import { getUserLevel } from '../api/stage';
import ExitBox from '../components/organisms/ExitBox';
import UserRupee from '../components/atoms/UserRupee';
import LevelBtn from '../components/atoms/LevelBtn';
import PageChangeButton from '../components/organisms/PageChangeButton';
import BlurBox from '../components/atoms/BlurBox';
import LevelModal from '../components/organisms/LevelModal';
import { drawingSSE, disconnectDrawingSSE } from '../sse/drawingSSE';

type CharacterImageProps = {
  $bgImage: string | null;
  $position: { right: number; bottom: number };
  onClick: () => void;
};

const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  position: fixed;
  overflow: hidden;
`;

const BlueSky = styled.div`
  width: 100%;
  height: 30%;
  background: linear-gradient(
    180deg,
    rgba(26, 112, 223, 0.8) 0%,
    rgba(105, 206, 252, 0.8) 100%
  );
  position: relative;
`;

const BigWhiteCloud = styled.div`
  width: 250px;
  height: 140px;
  border-radius: 50%;
  background: var(--white, #fff);
  box-shadow: -18px -18px 58px 0px rgba(0, 0, 0, 0.25) inset;
  z-index: 0;
  position: absolute;
  top: -40px;
  right: 40%;
`;

const SmallWhiteCloud = styled.div`
  width: 150px;
  height: 100px;
  border-radius: 50%;
  background: var(--white, #fff);
  box-shadow: -18px -18px 58px 0px rgba(0, 0, 0, 0.25) inset;
  z-index: 0;
  position: absolute;
  top: 5%;
  right: 22%;
`;

const ExitWrapper = styled.div`
  position: absolute;
  top: 3%;
`;

const LevelWrapper = styled.div`
  width: 100%;
  height: 70%;
  position: relative;
`;

const CharacterImage = styled.div<CharacterImageProps>`
  width: 300px;
  height: 300px;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 50;
  transition:
    right 1s ease,
    bottom 1s ease;
  right: ${(props) => `${props.$position.right}px`};
  bottom: ${(props) => `${props.$position.bottom}px`};
  cursor: pointer;
`;

const BottomToTopRoad = styled.div<{
  bottom: number;
  right: number;
}>`
  width: 579.819px;
  height: 48.096px;
  position: fixed;
  bottom: ${(props) => `${props.bottom || 0}px`};
  right: ${(props) => `${props.right || 0}px`};
  transform: rotate(-20deg);
  background: #c4e2a4;
`;

const TopToBottomRoad = styled.div<{
  bottom: number;
  right: number;
}>`
  width: 579.819px;
  height: 48.096px;
  position: fixed;
  bottom: ${(props) => `${props.bottom || 0}px`};
  right: ${(props) => `${props.right || 0}px`};
  transform: rotate(20deg);
  background: #c4e2a4;
`;

const GreenGround = styled.div`
  width: 100%;
  height: 70%;
  position: fixed;
  bottom: 0;
  z-index: -100;
  background: linear-gradient(180deg, #4ca652 0%, #8ecc51 27.6%);
`;

const cloudAnimation = keyframes`
  0% {
    transform: translateX(-300%);
  }
  100% {
    transform: translateX(300%);
  }
`;

const AnimatedBigWhiteCloud = styled(BigWhiteCloud)`
  animation: ${cloudAnimation} 30s linear infinite;
  transform: translateX(-100%);
  animation-delay: -30s;
`;

const AnimatedSmallWhiteCloud = styled(SmallWhiteCloud)`
  animation: ${cloudAnimation} 25s linear infinite;
  transform: translateX(-100%);
  animation-delay: -25s;
`;

function StageMapPage() {
  const userProfile = useRecoilValue(UserProfileState);
  const [currentPage, setCurrentPage] = useState(0);
  const [userLevel, setUserLevel] = useState<{
    highestClearedStageNumber: number | null;
    level: any[];
    page: any;
  }>({
    highestClearedStageNumber: null,
    level: [],
    page: {
      page: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    },
  });
  const [characterPosition, setCharacterPosition] = useState({
    right: 1150,
    bottom: 150,
  });
  const characterRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState<number | null>(
    null,
  );

  // 스테이지 Id
  const [stageId, setStageId] = useState<number | null>(null);
  // 레벨과 위치 정보를 관리할 배열
  const levelPositions = [
    { right: 1150, bottom: 150 },
    { right: 1150, bottom: 150 },
    { right: 700, bottom: 300 },
    { right: 272, bottom: 140 },
  ];

  const itemsPerPage = 3; // 한 페이지당 아이템 개수
  // 첫번째 페이지, 마지막 페이지 파악하는 변수
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === userLevel.page.totalPages - 1;
  // 화살표에 전달할 boolean 값
  const leftDisabled = isFirstPage;
  const rightDisabled = isLastPage;

  console.log('$$$$$$$$$$$$$$', userLevel);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUserLevel(
          currentPage,
          userProfile.profileId,
          itemsPerPage,
        );
        console.log('유저레벨 정보 불러오기', response);
        setUserLevel({
          highestClearedStageNumber:
            response.content.data.highestClearedStageNumber, // 현재 최고기록 스테이지
          level: response.content.data.record, // 데이터 배열 설정
          page: response.content.pageInfo, // pageInfo 설정
        });
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [currentPage, userProfile]);

  function getPositionIndex(number: number | undefined): number {
    if (typeof number === 'number') {
      if (number % 3 === 1) {
        return 1;
      }
      if (number % 3 === 2) {
        return 2;
      }
      return 3;
    }
    return 1;
  }

  // 최고 기록 레벨을 기반으로 캐릭터 위치 및 선택된 레벨 설정
  useEffect(() => {
    if (userLevel.highestClearedStageNumber) {
      const positionIndex = getPositionIndex(
        userLevel.highestClearedStageNumber,
      );
      // 최고 기록 레벨을 초기 선택된 레벨로 설정
      setSelectedLevelIndex(positionIndex - 1);
      // 최고 기록 레벨을 초기 캐릭터 위치로 설정
      const newPosition = levelPositions[positionIndex];
      setCharacterPosition({
        right: newPosition.right,
        bottom: newPosition.bottom,
      });
    }
  }, [userLevel, currentPage]);

  console.log('초기 캐릭터 위치는?', characterPosition);

  useEffect(() => {
    // 선택된 레벨이 있고 레벨 데이터가 있는 경우에만 실행
    if (selectedLevelIndex !== null && userLevel.level.length > 0) {
      console.log('선택 값', selectedLevelIndex);
      console.log('여기 언제 실행?');

      const selectedLevel = userLevel.level[selectedLevelIndex];
      if (selectedLevel) {
        // 해당 레벨의 ID 값을 전달
        setStageId(selectedLevel.id);
        console.log('클릭된 스테이지id', selectedLevel.id);
      }
    }
  }, [selectedLevelIndex, userLevel]);

  console.log('선택한 레벨', selectedLevelIndex);
  console.log('클릭된 스테이지id', stageId);

  const leftOnClick = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
  };

  const rightOnClick = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const handleLevelBtnClick = (level: number) => {
    // onClick 시 캐릭터 위치 변경
    const newPosition = levelPositions[level];
    if (newPosition) {
      setCharacterPosition(newPosition);
      // 레벨은 서버에서 받아온 배열 값이기 때문에 인덱스로 사용하기 위해 - 1
      setSelectedLevelIndex(level - 1);

      // ref를 사용하여 캐릭터 이동 애니메이션 트리거
      if (characterRef.current) {
        characterRef.current.style.right = `${newPosition.right}px`;
        characterRef.current.style.bottom = `${newPosition.bottom}px`;
      }
    }
  };

  return (
    <MapWrapper>
      {selectedLevelIndex !== null &&
        isModalOpen &&
        stageId &&
        userLevel.level[selectedLevelIndex] && ( // 레벨 데이터가 존재하는지 확인
          <>
            <BlurBox />
            <LevelModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              stageId={stageId}
              levelData={userLevel.level[selectedLevelIndex].stageNum} // 선택한 레벨 데이터 사용
              imgSrc={
                userLevel.level[selectedLevelIndex].subjectItem.subject
                  .subjectImage
              }
              star={
                userLevel.level[selectedLevelIndex].record
                  ? userLevel.level[selectedLevelIndex].record.score
                  : null
              }
            />
          </>
        )}
      <PageChangeButton
        leftOnClick={leftOnClick}
        rightOnClick={rightOnClick}
        leftDisabled={leftDisabled}
        rightDisabled={rightDisabled}
      />
      <BlueSky />
      <ExitWrapper>
        <ExitBox color="light" />
      </ExitWrapper>
      <AnimatedBigWhiteCloud />
      <AnimatedSmallWhiteCloud />
      <CharacterImage
        ref={characterRef}
        $bgImage={userProfile.profileImg}
        $position={characterPosition}
        onClick={() => selectedLevelIndex !== null && setIsModalOpen(true)}
      />
      <UserRupee />
      <LevelWrapper>
        <BottomToTopRoad bottom={270} right={750} />
        <TopToBottomRoad bottom={270} right={330} />
        <BottomToTopRoad bottom={270} right={-70} />
        {userLevel.level.length > 0 && (
          <>
            <LevelBtn
              level={1}
              star={
                userLevel.level[0].record
                  ? userLevel.level[0].record.score
                  : null
              }
              bottom={120}
              right={1180}
              imgSrc={userLevel.level[0].subjectItem.subject.subjectImage}
              onClick={() => handleLevelBtnClick(1)}
            />
            <LevelBtn
              level={2}
              star={
                userLevel.level[1].record
                  ? userLevel.level[1].record.score
                  : null
              }
              bottom={280}
              right={730}
              imgSrc={userLevel.level[1].subjectItem.subject.subjectImage}
              onClick={() => handleLevelBtnClick(2)}
            />
            <LevelBtn
              level={3}
              star={
                userLevel.level[2].record
                  ? userLevel.level[2].record.score
                  : null
              }
              bottom={120}
              right={300}
              imgSrc={userLevel.level[2].subjectItem.subject.subjectImage}
              onClick={() => handleLevelBtnClick(3)}
            />
          </>
        )}
      </LevelWrapper>
      <GreenGround />
    </MapWrapper>
  );
}

export default StageMapPage;
