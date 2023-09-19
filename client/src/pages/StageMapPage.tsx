import { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { UserProfileState } from '../recoil/profile/atom';
import { getUserLevel } from '../api/stage';
import ExitBox from '../components/organisms/ExitBox';
import UserRupee from '../components/atoms/UserRupee';
import LevelBtn from '../components/atoms/LevelBtn';
import PageChangeButton from '../components/organisms/PageChangeButton';

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

const CharacterImage = styled.div<{
  $bgImage: string | null;
  $position: { right: number; bottom: number };
}>`
  width: 300px;
  height: 300px;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 300;
  transition:
    right 1s ease,
    bottom 1s ease;
  right: ${(props) => `${props.$position.right}px`};
  bottom: ${(props) => `${props.$position.bottom}px`};
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
  const [userLevel, setUserLevel] = useState<{ level: any[]; page: any }>({
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
        setUserLevel({
          level: response.content.data, // 데이터 배열 설정
          page: response.content.pageInfo, // pageInfo 설정
        });
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [currentPage, userProfile]);

  useEffect(() => {
    // userLevel.level 배열에서 record가 null인 첫 번째 요소의 위치를 찾음
    const firstNullIndex = userLevel.level.findIndex(
      (level) => level.record === null,
    );

    // 레벨 클리어 단계에 따라 캐릭터 위치 변동
    if (firstNullIndex === -1) {
      // 모든 레벨이 null이 아닌 경우, 마지막 레벨의 위치를 사용
      const lastLevelIndex = userLevel.level.length - 1;
      setCharacterPosition({
        right: 272,
        bottom: 144,
      });
    } else if (firstNullIndex === 2) {
      setCharacterPosition({
        right: 700,
        bottom: 300,
      });
    } else {
      // 첫 번째 null 이전에 레벨이 없는 경우, 초기 위치 사용
      setCharacterPosition({ right: 1150, bottom: 150 });
    }
  }, [userLevel.level]);

  const leftOnClick = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
  };

  const rightOnClick = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const handleLevelBtnClick = (
    level: number,
    right: number,
    bottom: number,
  ) => {
    // onClick 시 캐릭터 위치 변경
    setCharacterPosition({ right, bottom });

    // ref를 사용하여 캐릭터 이동 애니메이션 트리거
    if (characterRef.current) {
      characterRef.current.style.right = `${right}px`;
      characterRef.current.style.bottom = `${bottom}px`;
    }
  };

  return (
    <MapWrapper>
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
              onClick={() => handleLevelBtnClick(1, 1150, 140)}
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
              onClick={() => handleLevelBtnClick(2, 700, 300)}
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
              onClick={() => handleLevelBtnClick(3, 272, 140)}
            />
          </>
        )}
      </LevelWrapper>
      <GreenGround />
    </MapWrapper>
  );
}

export default StageMapPage;
