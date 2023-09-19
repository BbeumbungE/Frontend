import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import theme from '../style/theme';
import { UserProfileState } from '../recoil/profile/atom';
import AlarmBoard from '../components/atoms/AlarmBoard';
import AlarmPageButton from '../components/organisms/AlarmPageButton';
import ExitBox from '../components/organisms/ExitBox';
import Button from '../components/atoms/Button';
import UserRupee from '../components/atoms/UserRupee';

const MyProfileContainer = styled.div`
  width: 100vw;
  height: 100vh; /* 화면 높이만큼 컨테이너 높이 설정 */
  display: flex;
`;
const LeftContainer = styled.div`
  width: 50vw;
  height: 100vh; /* 화면 높이만큼 컨테이너 높이 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const RightContainer = styled.div`
  width: 50vw;
  height: 100vh; /* 화면 높이만큼 컨테이너 높이 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CenteredAlarmBoard = styled.div`
  align-items: center;
  justify-content: center;
  position: relative;
  height: 520px;
  margin-top: 22px;
`;
const CenteredProfileBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 200px;
`;

const ExitBoxWrapper = styled.div`
  position: fixed;
  top: 3%;
  left: 0%;
`;

const CharacterImage = styled.div<{ imgsrc: string }>`
  width: 300px;
  height: 300px;
  background-image: url(${(props) => props.imgsrc}); // url() 함수 사용
  background-size: cover; // 이미지 크기 조절
  background-position: center; // 이미지 위치 조절
`;

const NicknameText = styled.span`
  display: flex;
  justify-content: center;
  font-family: 'TmoneyRoundWindExtraBold';
  font-size: 55px;
  align-items: center;
  color: ${(props) => props.theme.colors.mainBlack};
`;

function MyProfilePage() {
  const [userProfile, setUserProfile] = useRecoilState(UserProfileState);
  return (
    <MyProfileContainer>
      <LeftContainer>
        <ExitBoxWrapper>
          <ExitBox color="dark" />
        </ExitBoxWrapper>
        <UserRupee />
        {userProfile.profileImg && (
          <CenteredProfileBoard>
            <NicknameText>{userProfile.nickname}</NicknameText>
            <CharacterImage imgsrc={userProfile.profileImg} />
            <Button buttonText="d" color="f" />
          </CenteredProfileBoard>
        )}
      </LeftContainer>
      <RightContainer>
        <CenteredAlarmBoard>
          <AlarmBoard
            alarms={[
              {
                id: 8, // notificationId
                content:
                  '길몬 아바타가 출시되었습니다 길몬 아바타가 출시되었습니다.',
                type: 'NEW_AVATAR',
                receiver: '엄한결님',
                createAt: '2023-09-15T00:18:20.204304',
                read: false,
              },
              {
                id: 9,
                content: '아하아아아아아아아 그림주제가 출시되었습니다.',
                type: 'NEW_SUBJECT',
                receiver: '엄한결님',
                createAt: '2023-09-15T13:20:50.839429',
                read: false,
              },
              {
                id: 10,
                content: '이으ㅇㅣ 그림주제가 출시되었습니다.',
                type: 'NEW_SUBJECT',
                receiver: '엄한결님',
                createAt: '2023-09-15T13:21:09.349908',
                read: false,
              },
              {
                id: 11,
                content:
                  '김철수 아바타 철수 아바타 철수 아바타 철수 아바타가 출시되었습니다.',
                type: 'NEW_AVATAR',
                receiver: '엄한결님',
                createAt: '2023-09-15T13:21:42.890412',
                read: false,
              },
              {
                id: 12,
                content: '에 아바타가 출시되었습니다.',
                type: 'NEW_AVATAR',
                receiver: '엄한결님',
                createAt: '2023-09-15T13:21:42.890412',
                read: false,
              },
            ]}
          />
          <AlarmPageButton
            leftOnClick={() => {
              console.log('left');
            }}
            rightOnClick={() => {
              console.log('right');
            }}
          />
        </CenteredAlarmBoard>
        <Button buttonText="       내 그림 보러가기       " color="blue" />
        <Button
          buttonText="             로그아웃             "
          color="darkGray"
        />
      </RightContainer>
    </MyProfileContainer>
  );
}

export default MyProfilePage;
