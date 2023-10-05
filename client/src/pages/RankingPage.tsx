import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserProfileState } from '../recoil/profile/atom';
import theme from '../style/theme';
import RankPicturePostDiv from '../components/organisms/RankPicturePostDiv';
import PageHeaderText from '../components/atoms/PageHeaderText';
import ExitBox from '../components/organisms/ExitBox';
import ExitBoxOnBlur from '../components/organisms/ExitBoxOnBlur';
import BlurBox from '../components/atoms/BlurBox';
import DetailRankPostBox from '../components/organisms/DetailRankPostBox';
import {
  getRankPosts,
  getDetail,
  makeEmotion,
  updateEmotion,
  deleteEmotion,
} from '../api/posts';

const RankingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.lightSalmon};
  padding: 2.5rem;
  align-items: center;
  justify-content: center;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 75rem;
`;

const ExitBoxWrapper = styled.div`
  position: fixed;
  top: 3%;
  left: 0%;
`;

const ExitBoxOnBlurWrapper = styled.div`
  position: fixed;
  top: 3%;
  left: 0%;
  z-index: 402;
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
  const [posts, setPosts] = useState<any>([]);
  const [subjectTitle, setSubjectTitle] = useState<string>('');
  const userProfile = useRecoilValue(UserProfileState);
  // 게시물 상세 state
  const [detailPost, setDetailPost] = useState<any>({});
  const [detailPostId, setDetailPostId] = useState<number>(0);
  const [postRank, setPostRank] = useState<number>(1);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [smileCnt, setSmileCnt] = useState<number>(0);
  const [wowCnt, setWowCnt] = useState<number>(0);
  const [sadCnt, setSadCnt] = useState<number>(0);
  const [isSmile, setIsSmile] = useState<boolean>(false);
  const [isWow, setIsWow] = useState<boolean>(false);
  const [isSad, setIsSad] = useState<boolean>(false);
  const { topic } = useParams();
  async function loadPosts(subjectId: number) {
    try {
      const response = await getRankPosts(subjectId);
      const rankPosts = { ...response.content };
      await setSubjectTitle(rankPosts.subjectName);
      await setPosts(rankPosts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadPosts(Number(topic));
  }, []);

  // 현재 시간 관련 변수들
  const now = new Date();
  const currentWeek = getWeekNumber(now);
  const month = now.toLocaleString('default', { month: 'long' }); // 현재 월 이름 가져오기

  // 게시물 클릭 및 조회
  const handlePostClick = async (postId: number, profileId: number) => {
    try {
      const response = await getDetail(postId, profileId);
      const newDetail = { ...response.content };
      await setDetailPost(newDetail);
      const emotionInfos = response.content.postEmotionTypeInfos;
      emotionInfos.forEach((info) => {
        if (info.emotionTypeId === 1) {
          setIsSmile(info.emoted);
          setSmileCnt(info.emotionCount);
        } else if (info.emotionTypeId === 2) {
          setIsWow(info.emoted);
          setWowCnt(info.emotionCount);
        } else if (info.emotionTypeId === 3) {
          setIsSad(info.emoted);
          setSadCnt(info.emotionCount);
        }
      });
      setDetailPostId(postId);
      if (isDetail === false) {
        setIsDetail(true);
      }
    } catch (error) {
      console.log('게시물 상세 에러: ', error);
    }
  };
  // 감정 표현 관련
  const SmileAction = async (postId: number, profileId: number) => {
    try {
      if (!isSmile) {
        if (isWow || isSad) {
          await updateEmotion(postId, profileId, 1);
          if (isWow) {
            setIsWow(false);
            setWowCnt(wowCnt - 1);
          }
          if (isSad) {
            setIsSad(false);
            setSadCnt(sadCnt - 1);
          }
        } else {
          await makeEmotion(postId, profileId, 1);
        }
        setIsSmile(true);
        setSmileCnt(smileCnt + 1);
      } else {
        await deleteEmotion(postId, profileId);
        setIsSmile(false);
        setSmileCnt(smileCnt - 1);
      }
    } catch (error) {
      console.log('감정표현 갱신 실패: ', error);
    }
  };
  const WowAction = async (postId: number, profileId: number) => {
    try {
      if (!isWow) {
        if (isSmile || isSad) {
          await updateEmotion(postId, profileId, 2);
          if (isSmile) {
            setIsSmile(false);
            setSmileCnt(smileCnt - 1);
          }
          if (isSad) {
            setIsSad(false);
            setSadCnt(sadCnt - 1);
          }
        } else {
          await makeEmotion(postId, profileId, 2);
        }
        setIsWow(true);
        setWowCnt(wowCnt + 1);
      } else {
        await deleteEmotion(postId, profileId);
        setIsWow(false);
        setWowCnt(wowCnt - 1);
      }
    } catch (error) {
      console.log('감정표현 갱신 실패: ', error);
    }
  };
  const SadAction = async (postId: number, profileId: number) => {
    try {
      if (!isSad) {
        if (isSmile || isWow) {
          await updateEmotion(postId, profileId, 3);
          if (isSmile) {
            setIsSmile(false);
            setSmileCnt(smileCnt - 1);
          }
          if (isWow) {
            setIsWow(false);
            setWowCnt(wowCnt - 1);
          }
        } else {
          await makeEmotion(postId, profileId, 3);
        }
        setIsSad(true);
        setSadCnt(sadCnt + 1);
      } else {
        await deleteEmotion(postId, profileId);
        setIsSad(false);
        setSadCnt(sadCnt - 1);
      }
    } catch (error) {
      console.log('감정표현 갱신 실패: ', error);
    }
  };

  return (
    <RankingPageContainer>
      {isDetail === true && detailPost && (
        <>
          <BlurBox />
          <ExitBoxOnBlurWrapper>
            <ExitBoxOnBlur
              color="light"
              onClick={() => {
                loadPosts(Number(topic));
                setIsDetail(false);
                setIsSmile(false);
                setIsWow(false);
                setIsSad(false);
                setSmileCnt(0);
                setWowCnt(0);
                setSadCnt(0);
                setDetailPostId(0);
              }}
            />
          </ExitBoxOnBlurWrapper>
          <DetailRankPostBox
            ranking={postRank}
            imgsrc={detailPost.canvasUrl}
            SmileCount={smileCnt}
            WowCount={wowCnt}
            SadCount={sadCnt}
            SmilePressed={isSmile}
            WowPressed={isWow}
            SadPressed={isSad}
            SmileClick={() => {
              SmileAction(detailPostId, userProfile.profileId);
            }}
            WowClick={() => {
              WowAction(detailPostId, userProfile.profileId);
            }}
            SadClick={() => {
              SadAction(detailPostId, userProfile.profileId);
            }}
          />
        </>
      )}
      <ExitBoxWrapper>
        <ExitBox color="dark" />
      </ExitBoxWrapper>
      <PageHeaderText
        content={`${month} ${currentWeek}주차`}
        color="dark"
        fontSize="1.875rem"
      />
      <PageHeaderText
        content={`${subjectTitle} 주간 랭킹`}
        color="dark"
        fontSize="3.75rem"
      />
      {posts.rankerList && (
        <PostContainer>
          {posts.rankerList.map((post: any, index: number) => (
            <RankPicturePostDiv
              key={post.postId}
              rank={index + 1}
              imgSrc={post.canvasUrl}
              onClick={() => {
                setPostRank(index + 1);
                handlePostClick(post.postId, userProfile.profileId);
              }}
              color="dark"
            />
          ))}
          {posts.rankerList.length < 8 &&
            Array.from({ length: 8 - posts.rankerList.length }).map(
              (_, index) => (
                <RankPicturePostDiv
                  key={`blank-${index + posts.rankerList.length + 1}`}
                  rank={index + posts.rankerList.length + 1}
                  imgSrc=""
                  onClick={() => {
                    return null;
                  }}
                  color="dark"
                />
              ),
            )}
        </PostContainer>
      )}
    </RankingPageContainer>
  );
}

export default RankingPage;
