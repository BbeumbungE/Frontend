import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { UserProfileState } from '../recoil/profile/atom';
import { getUserTopic } from '../api/menu';
import menuTreeIcon from '../assets/image/etc/menuTree.svg';
import menuMountainIcon from '../assets/image/etc/mainMountain.svg';
import ExitBox from '../components/organisms/ExitBox';
import ProfileBtn from '../components/atoms/ProfileBtn';
import TopicMenuBox from '../components/organisms/TopicMenuBox';
import PageChangeButton from '../components/organisms/PageChangeButton';

interface SvgImageProps extends React.HTMLProps<HTMLImageElement> {
  'data-bottom'?: string;
  'data-right'?: string;
}

const MainMenuWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.lightPurple};
  position: fixed;
  overflow: hidden;
`;

const ExitBoxWrapper = styled.div`
  position: fixed;
  top: 3%;
  left: 0%;
`;

const BearImg = styled.img<SvgImageProps>`
  position: fixed;
  bottom: ${(props) => props['data-bottom'] || '0'};
  right: ${(props) => props['data-right'] || '0'};
  width: ${(props) => props.width || '150px'};
  height: ${(props) => props.height || '150px'};
  transform: scaleX(-1);
  z-index: -2;
`;

const SvgImage = styled.img<SvgImageProps>`
  position: fixed;
  bottom: ${(props) => props['data-bottom'] || '0'};
  right: ${(props) => props['data-right'] || '0'};
  width: ${(props) => props.width || '150px'};
  height: ${(props) => props.height || '150px'};
  z-index: -2;
`;

const PurpleBottom = styled.div`
  background-color: ${(props) => props.theme.colors.purple};
  width: 100%;
  height: 58px;
  position: fixed;
  bottom: 0;
  z-index: -1;
`;

const BalloonWrapper = styled.div`
  position: fixed;
  top: 5%;
  left: 15%;
`;

const Balloon = styled.div`
  position: relative;
  background-color: white;
  width: 320px;
  height: 70px;
  border-radius: 50px;
  font-family: 'TmoneyRoundWindRegular';
  font-size: 25px;
  text-align: center;
  line-height: 70px;
`;

const BalloonTail = styled.div`
  content: '';
  position: absolute;
  top: 40%;
  left: -20px;
  margin-top: -10px;
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-right: 30px solid white;
  border-bottom: 20px solid transparent;
`;

interface UserTopicProps {
  page: number;
  pageSize: number;
}

function DrawingTopicMenuPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [userProfile, setUserProfile] = useRecoilState(UserProfileState);
  const [userTopics, setUserTopics] = useState<any[]>([]);

  // const numPages = Math.ceil(total / limit);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUserTopic(currentPage, userProfile.profileId);
        console.log('유저 보유 토픽', response);
        setUserTopics(response.content.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [currentPage, userProfile]);

  const leftOnClick = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
  };

  const rightOnClick = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  return (
    <MainMenuWrapper>
      <ExitBoxWrapper>
        <ExitBox color="dark" />
      </ExitBoxWrapper>
      <BalloonWrapper>
        <Balloon>
          어떤 주제를 그려볼까요?
          <BalloonTail />
        </Balloon>
      </BalloonWrapper>
      <ProfileBtn />
      <BearImg
        src={`${process.env.REACT_APP_IMG_URL}/service-image/mainBear.png`}
        alt="menuTreeIcon"
        width="540px"
        height="540px"
        data-bottom="33%"
        data-right="74%"
      />
      <PageChangeButton leftOnClick={leftOnClick} rightOnClick={rightOnClick} />
      <TopicMenuBox topicData={userTopics} />
      <SvgImage
        src={menuTreeIcon}
        alt="menuTreeIcon"
        width="120px"
        height="120px"
        data-bottom="5%"
        data-right="20%"
      />
      <SvgImage
        src={menuTreeIcon}
        alt="menuTreeIcon"
        width="150px"
        height="150px"
        data-bottom="5%"
        data-right="25%"
      />
      <SvgImage
        src={menuMountainIcon}
        alt="menuTreeIcon"
        width="250px"
        height="250px"
        data-bottom="-5%"
        data-right="75%"
      />
      <SvgImage
        src={menuMountainIcon}
        alt="menuTreeIcon"
        width="150px"
        height="150px"
        data-bottom="0%"
        data-right="71%"
      />
      <PurpleBottom />
    </MainMenuWrapper>
  );
}

export default DrawingTopicMenuPage;
