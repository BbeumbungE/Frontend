import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserProfileState } from '../recoil/profile/atom';
import theme from '../style/theme';
import PicturePostDiv from '../components/atoms/PicturePostDiv';
import PageHeaderText from '../components/atoms/PageHeaderText';
import ExitBox from '../components/organisms/ExitBox';
import ExitBoxOnBlur from '../components/organisms/ExitBoxOnBlur';
import BlurBox from '../components/atoms/BlurBox';
import PageChangeButton from '../components/organisms/PageChangeButton';
import DetailPostBox from '../components/organisms/DetailPostBox';
import {
  getPosts,
  getDetail,
  makeEmotion,
  updateEmotion,
  deleteEmotion,
} from '../api/posts';

const TopicPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.green};
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
  margin-top: 1.6875rem;
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

function TopicPage() {
  const [posts, setPosts] = useState<any>({});
  const [subjectTitle, setSubjectTitle] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const userProfile = useRecoilValue(UserProfileState);
  // 게시물 상세 state
  const [detailPost, setDetailPost] = useState<any>({});
  const [detailPostId, setDetailPostId] = useState<number>(0);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [smileCnt, setSmileCnt] = useState<number>(0);
  const [wowCnt, setWowCnt] = useState<number>(0);
  const [sadCnt, setSadCnt] = useState<number>(0);
  const [isSmile, setIsSmile] = useState<boolean>(false);
  const [isWow, setIsWow] = useState<boolean>(false);
  const [isSad, setIsSad] = useState<boolean>(false);
  const { topic } = useParams();

  async function loadPosts(subjectId: number, curPage: number) {
    try {
      const response = await getPosts(subjectId, curPage);
      const newPosts = { ...response.content };
      await setSubjectTitle(newPosts.subjectName);
      await setPosts(newPosts);
      console.log(newPosts);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadPosts(Number(topic), currentPage);
  }, [currentPage]);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === posts.totalPages - 1;
  const leftDisabled = isFirstPage;
  const rightDisabled = isLastPage;
  const leftOnClick = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
  };

  const rightOnClick = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };
  // 게시물 클릭 및 조회
  const handlePostClick = async (postId: number, profileId: number) => {
    try {
      const response = await getDetail(postId, profileId);
      const newDetail = { ...response.content };
      await setDetailPost(newDetail);
      console.log(response.content);
      const emotionInfos = response.content.postEmotionTypeInfos;
      console.log(emotionInfos);
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
    <TopicPageContainer>
      {isDetail === true && detailPost && (
        <>
          <BlurBox />
          <ExitBoxOnBlurWrapper>
            <ExitBoxOnBlur
              color="light"
              onClick={() => {
                loadPosts(Number(topic), currentPage);
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
          <DetailPostBox
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
      <PageHeaderText content={subjectTitle} color="dark" fontSize="5rem" />
      <PageChangeButton
        leftOnClick={leftOnClick}
        rightOnClick={rightOnClick}
        leftDisabled={leftDisabled}
        rightDisabled={rightDisabled}
      />
      {posts.postLists && (
        <PostContainer>
          {posts.postLists.map((post: any) => (
            <PicturePostDiv
              key={post.postId}
              imgSrc={post.canvasUrl}
              onClick={() => {
                handlePostClick(post.postId, userProfile.profileId);
              }}
            />
          ))}
          {posts.postLists.length < 8 &&
            Array.from({ length: 8 - posts.postLists.length }).map(
              (_, index) => (
                <PicturePostDiv
                  key={`blank-${index + posts.postLists.length + 1}`}
                  imgSrc=""
                  onClick={() => {
                    return null;
                  }}
                />
              ),
            )}
        </PostContainer>
      )}
    </TopicPageContainer>
  );
}

export default TopicPage;
