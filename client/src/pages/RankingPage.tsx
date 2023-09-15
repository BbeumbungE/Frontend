import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { UserProfileState } from '../recoil/profile/atom';
import theme from '../style/theme';
import RankPicturePostDiv from '../components/organisms/RankPicturePostDiv';
import PageHeaderText from '../components/atoms/PageHeaderText';
import ExitBox from '../components/organisms/ExitBox';
import BlurBox from '../components/atoms/BlurBox';
import DetailRankPostBox from '../components/organisms/DetailRankPostBox';
import DetailPostBox from '../components/organisms/DetailPostBox';
import {
  getRankPosts,
  getDetail,
  makeEmotion,
  deleteEmotion,
} from '../api/posts';

const RankingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.lightSalmon};
  padding: 40px;
  align-items: center;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 1200px;
`;

const ExitBoxWrapper = styled.div`
  position: fixed;
  top: 3%;
  left: 0%;
`;

// 현재 주차 계산 function
function getWeekNumber(d: Date) {
  const firstDayOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
  // 월의 첫 번째 날이 몇 주차인지 계산합니다.
  const firstDayWeek = Math.ceil(
    (firstDayOfMonth.getDate() + firstDayOfMonth.getDay()) / 7,
  );
  // 현재 날짜의 주차를 계산합니다.
  const currentWeek =
    firstDayWeek + Math.floor((d.getDate() - 1 + firstDayOfMonth.getDay()) / 7);
  return currentWeek;
}

function RankingPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [detailPostId, setDetailPostId] = useState<number>(0);
  const [userProfile, setUserProfile] = useRecoilState(UserProfileState);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [isSmile, setIsSmile] = useState<boolean>(false);
  const [isWow, setIsWow] = useState<boolean>(false);
  const [isSad, setIsSad] = useState<boolean>(false);
  useEffect(() => {
    // async function loadPosts() {
    //   try {
    //     const response = await getRankPosts();
    //     setPosts(response.content)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // loadPosts()
  }, []);

  // 임시 변수
  const title = '고양이';

  // 현재 시간 관련 변수들
  const now = new Date();
  const currentWeek = getWeekNumber(now);
  const month = now.toLocaleString('default', { month: 'long' }); // 현재 월 이름 가져오기

  // 게시물 클릭
  const handlePostClick = async (postId: number, profileId: number) => {
    try {
      const response = await getDetail(postId, profileId);
      const emotionInfos = response.content.postEmotionTypeInfos;
      emotionInfos.forEach((info) => {
        if (info.emotionTypeId === 1) {
          setIsSmile(info.emoted);
        } else if (info.emotionTypeId === 2) {
          setIsWow(info.emoted);
        } else if (info.emotionTypeId === 3) {
          setIsSad(info.emoted);
        }
      });
      setDetailPostId(postId);
    } catch (error) {
      console.log('게시물 선택 에러: ', error);
    }
  };
  // 감정 표현 관련
  function SmileAction() {
    try {
      if (!isSmile) {
        // await deleteEmotion(postId, profileId);
        if (isWow) {
          setIsWow(false);
        }
        if (isSad) {
          setIsSad(false);
        }
        // await makeEmotion(postId, profileId, 1)
        setIsSmile(true);
      } else {
        // await deleteEmotion(postId, profileId);
        setIsSmile(false);
      }
    } catch (error) {
      console.log('감정표현 갱신 실패: ', error);
    }
  }
  function WowAction() {
    try {
      if (!isWow) {
        // await deleteEmotion(postId, profileId);
        if (isSmile) {
          setIsSmile(false);
        }
        if (isSad) {
          setIsSad(false);
        }
        // await makeEmotion(postId, profileId, 2)
        setIsWow(true);
      } else {
        // await deleteEmotion(postId, profileId);
        setIsWow(false);
      }
    } catch (error) {
      console.log('감정표현 갱신 실패: ', error);
    }
  }
  function SadAction() {
    try {
      if (!isSad) {
        // await deleteEmotion(postId, profileId);
        if (isWow) {
          setIsWow(false);
        }
        if (isSmile) {
          setIsSmile(false);
        }
        // await makeEmotion(postId, profileId, 1)
        setIsSad(true);
      } else {
        // await deleteEmotion(postId, profileId);
        setIsSad(false);
      }
    } catch (error) {
      console.log('감정표현 갱신 실패: ', error);
    }
  }

  return (
    <RankingPageContainer>
      {isDetail === true && (
        <>
          <BlurBox
            onClick={() => {
              setIsDetail(false);
              setDetailPostId(0);
            }}
          />
          <DetailRankPostBox
            imgsrc={`${process.env.REACT_APP_IMG_URL}/item/avatar/unicorn.png`}
            ranking={1}
            SmileCount={45}
            WowCount={300}
            SadCount={661}
            SmilePressed={isSmile}
            WowPressed={isWow}
            SadPressed={isSad}
            SmileClick={() => {
              SmileAction();
            }}
            WowClick={() => {
              WowAction();
            }}
            SadClick={() => {
              SadAction();
            }}
          />
          {/* <DetailPostBox
            imgsrc={`${process.env.REACT_APP_IMG_URL}/item/avatar/unicorn.png`}
            SmileCount={45}
            WowCount={300}
            SadCount={661}
            SmilePressed={isSmile}
            WowPressed={isWow}
            SadPressed={isSad}
            SmileClick={() => {
              SmileAction();
              console.log('Smile clicked');
            }}
            WowClick={() => {
              WowAction();
              console.log('Wow clicked');
            }}
            SadClick={() => {
              SadAction();
              console.log('Sad clicked');
            }}
          /> */}
        </>
      )}
      <ExitBoxWrapper>
        <ExitBox color="dark" />
      </ExitBoxWrapper>
      <PageHeaderText
        content={`${month} ${currentWeek}주차`}
        color="dark"
        fontSize="30px"
      />
      <PageHeaderText
        content={`${title} 주간랭킹`}
        color="dark"
        fontSize="60px"
      />
      <PostContainer>
        {/* {posts.map((post) => (
          <RankPicturePostDiv
            key={post.id}
            rank={post.rank}
            imgSrc={post.imageURL}
            onClick={() => {
              handlePostClick();
            }}
            color="dark"
          />
        ))} */}
        <RankPicturePostDiv
          rank={1}
          imgSrc={`${process.env.REACT_APP_IMG_URL}/item/avatar/unicorn.png`}
          onClick={() => {
            handlePostClick(2, 2);
            setIsDetail(true);
          }}
          color="dark"
        />
        <RankPicturePostDiv
          rank={2}
          imgSrc=""
          onClick={() => {
            console.log('clk9');
          }}
          color="dark"
        />
        <RankPicturePostDiv
          rank={3}
          imgSrc=""
          onClick={() => {
            console.log('clk');
          }}
          color="dark"
        />
        <RankPicturePostDiv
          rank={4}
          imgSrc=""
          onClick={() => {
            console.log('clk9');
          }}
          color="dark"
        />
        <RankPicturePostDiv
          rank={5}
          imgSrc=""
          onClick={() => {
            console.log('clk');
          }}
          color="dark"
        />
        <RankPicturePostDiv
          rank={6}
          imgSrc=""
          onClick={() => {
            console.log('clk9');
          }}
          color="dark"
        />
        <RankPicturePostDiv
          rank={7}
          imgSrc=""
          onClick={() => {
            console.log('clk');
          }}
          color="dark"
        />
        <RankPicturePostDiv
          rank={8}
          imgSrc=""
          onClick={() => {
            console.log('clk9');
          }}
          color="dark"
        />
      </PostContainer>
    </RankingPageContainer>
  );
}

export default RankingPage;
