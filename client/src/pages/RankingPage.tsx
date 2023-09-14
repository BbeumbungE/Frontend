import styled from 'styled-components';
import { useEffect } from 'react';
import theme from '../style/theme';
import RankPicurePostDiv from '../components/organisms/RankPicturePostDiv';
import PageHeaderText from '../components/atoms/PageHeaderText';
import ExitBox from '../components/organisms/ExitBox';

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
  useEffect(() => {
    // const now = new Date();
    // const week = getWeekNumber(now);
    // console.log(now);
    // console.log(week);
  }, []);
  const now = new Date();
  const currentWeek = getWeekNumber(now);
  const month = now.toLocaleString('default', { month: 'long' }); // 현재 월 이름 가져오기
  return (
    <RankingPageContainer>
      <ExitBoxWrapper>
        <ExitBox color="dark" />
      </ExitBoxWrapper>
      <PageHeaderText
        content={`${month} ${currentWeek}주차 고양이 주간랭킹`}
        color="dark"
      />
      <PostContainer>
        <RankPicurePostDiv
          rank={1}
          imgSrc={`${process.env.REACT_APP_IMG_URL}/item/avatar/unicorn.png`}
          onClick={() => {
            console.log('clk');
          }}
          color="dark"
        />
        <RankPicurePostDiv
          rank={2}
          imgSrc=""
          onClick={() => {
            console.log('clk9');
          }}
          color="dark"
        />
        <RankPicurePostDiv
          rank={3}
          imgSrc=""
          onClick={() => {
            console.log('clk');
          }}
          color="dark"
        />
        <RankPicurePostDiv
          rank={4}
          imgSrc=""
          onClick={() => {
            console.log('clk9');
          }}
          color="dark"
        />
        <RankPicurePostDiv
          rank={5}
          imgSrc=""
          onClick={() => {
            console.log('clk');
          }}
          color="dark"
        />
        <RankPicurePostDiv
          rank={6}
          imgSrc=""
          onClick={() => {
            console.log('clk9');
          }}
          color="dark"
        />
        <RankPicurePostDiv
          rank={7}
          imgSrc=""
          onClick={() => {
            console.log('clk');
          }}
          color="dark"
        />
        <RankPicurePostDiv
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
