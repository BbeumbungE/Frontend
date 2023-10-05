/* eslint-disable no-nested-ternary */
import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { UserProfileState } from '../recoil/profile/atom';
import { getUserLevel } from '../api/stage';
import ExitBox from '../components/organisms/ExitBox';
import UserRupee from '../components/atoms/UserRupee';
import LevelBtn from '../components/organisms/LevelBtn';
import PageChangeButton from '../components/organisms/PageChangeButton';
import BlurBox from '../components/atoms/BlurBox';
import LevelModal from '../components/organisms/LevelModal';
import EmptyLevelBtn from '../components/organisms/EmptyLevelBtn';
import { drawingSSE, disconnectDrawingSSE } from '../sse/drawingSSE';
import { useBGM } from '../sounds/MusicContext';
import ExitBoxOnBlur from '../components/organisms/ExitBoxOnBlur';

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
  width: 15.625rem;
  height: 8.75rem;
  border-radius: 50%;
  background: var(--white, #fff);
  box-shadow: -1.125rem -1.125rem 3.625rem 0rem rgba(0, 0, 0, 0.25) inset;
  z-index: 0;
  position: absolute;
  top: -2.5rem;
  right: 40%;
`;

const SmallWhiteCloud = styled.div`
  width: 9.375rem;
  height: 6.25rem;
  border-radius: 50%;
  background: var(--white, #fff);
  box-shadow: -1.125rem -1.125rem 3.625rem 0rem rgba(0, 0, 0, 0.25) inset;
  z-index: 0;
  position: absolute;
  top: 5%;
  right: 22%;
`;

const ExitWrapper = styled.div`
  position: absolute;
  top: 3%;
  z-index: 100;
`;

const LevelWrapper = styled.div`
  width: 100%;
  height: 70%;
  position: relative;
`;

const CharacterImage = styled.div<CharacterImageProps>`
  width: 18.75rem;
  height: 18.75rem;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 50;
  transition:
    right 1s ease,
    bottom 1s ease;
  right: ${(props) => `${props.$position.right}rem`};
  bottom: ${(props) => `${props.$position.bottom}rem`};
  cursor: pointer;
`;

const BottomToTopRoad = styled.div<{
  bottom: number;
  right: number;
}>`
  width: 36.2387rem;
  height: 3.006rem;
  position: fixed;
  bottom: ${(props) => `${props.bottom || 0}rem`};
  right: ${(props) => `${props.right || 0}rem`};
  transform: rotate(-20deg);
  background: #c4e2a4;
`;

const TopToBottomRoad = styled.div<{
  bottom: number;
  right: number;
}>`
  width: 36.2387rem;
  height: 3.006rem;
  position: fixed;
  bottom: ${(props) => `${props.bottom || 0}rem`};
  right: ${(props) => `${props.right || 0}rem`};
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
  const navigate = useNavigate();
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
    right: 1120 / 16,
    bottom: 150 / 16,
  });
  const characterRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState<number | null>(
    0,
  );

  // 스테이지 Id
  const [stageId, setStageId] = useState<number | null>(null);
  // 레벨과 위치 정보를 관리할 배열
  const levelPositions = [
    { right: 1150 / 16, bottom: 150 / 16 },
    { right: 1150 / 16, bottom: 150 / 16 },
    { right: 710 / 16, bottom: 280 / 16 },
    { right: 310 / 16, bottom: 130 / 16 },
  ];

  const { startBGM } = useBGM();
  const itemsPerPage = 3; // 한 페이지당 아이템 개수
  // 첫번째 페이지, 마지막 페이지 파악하는 변수
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === userLevel.page.totalPages - 1;
  // 화살표에 전달할 boolean 값
  const leftDisabled = isFirstPage;
  const rightDisabled = isLastPage;

  console.log('$$$$$$$$$$$$$$', userLevel);

  useEffect(() => {
    startBGM('stage');
  });

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
  }, [currentPage]);

  function getPositionIndex(number: number | undefined): number {
    if (typeof number === 'number') {
      if (number % 3 === 0) {
        return 3;
      }
      return number % 3;
    }
    return 1;
  }

  useEffect(() => {
    if (userLevel.highestClearedStageNumber) {
      let positionIndex = getPositionIndex(userLevel.highestClearedStageNumber);

      // 만약 highestClearedStageNumber가 4 이상이면 positionIndex를 3으로 설정
      if (userLevel.highestClearedStageNumber >= 4) {
        console.log('유저의 최고레벨', userLevel.highestClearedStageNumber);
        positionIndex = 3;
      }
      console.log('유저 포지션 인덱스', positionIndex);

      // 최고 기록 레벨을 초기 선택된 레벨로 설정
      setSelectedLevelIndex(positionIndex - 1);
      // 최고 기록 레벨을 초기 캐릭터 위치로 설정
      const newPosition = levelPositions[positionIndex];
      setCharacterPosition(newPosition);
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
                userLevel.level[selectedLevelIndex].subjectItem.subjectImage
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
        <ExitBoxOnBlur onClick={() => navigate('/menu')} color="light" />
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
        <BottomToTopRoad bottom={270 / 16} right={750 / 16} />
        <TopToBottomRoad bottom={270 / 16} right={330 / 16} />
        <BottomToTopRoad bottom={270 / 16} right={-70 / 16} />
        {userLevel.level.length > 0 &&
          userLevel.level.map((level, index) => {
            const positionIndex = getPositionIndex(level.stageNum);
            const star = level.record ? level.record.score : null;
            if (level.id === null) {
              return (
                <EmptyLevelBtn
                  key={level.rightstageNum}
                  level={level.stageNum}
                  bottom={levelPositions[positionIndex].bottom}
                  right={levelPositions[positionIndex].right}
                />
              );
            }

            return (
              <LevelBtn
                key={level.stageNum}
                level={level.stageNum}
                star={star}
                bottom={levelPositions[positionIndex].bottom}
                right={levelPositions[positionIndex].right}
                imgSrc={level.subjectItem.subjectImage}
                onClick={() => handleLevelBtnClick(index + 1)}
              />
            );
          })}
      </LevelWrapper>
      <GreenGround />
    </MapWrapper>
  );
}

export default StageMapPage;
