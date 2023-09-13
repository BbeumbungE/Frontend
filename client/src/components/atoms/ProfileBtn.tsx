import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { UserProfileState } from '../../recoil/profile/atom';
import theme from '../../style/theme';

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 2%;
  right: 2%;
`;

const StyledCharacter = styled.div<{ $bgColor: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.$bgColor};
  cursor: pointer;
  z-index: 100;
`;

const CharacterImage = styled.div<{ $bgImage: string | null }>`
  width: 80px;
  height: 80px;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 200;
`;

const ModalText = styled.span`
  font-family: 'TmoneyRoundWindRegular';
  font-size: 30px;
  color: ${(props) => props.theme.colors.mainBlack};
`;

function ProfileBtn() {
  const [userProfile, setUserProfile] = useRecoilState(UserProfileState);
  let bgColor = theme.colors.mainWhite; // 기본값은 mainBlue

  switch (userProfile.character) {
    case 'hamster':
      bgColor = theme.hamsterColors.sky;
      break;
    case 'otter':
      bgColor = theme.otterColors.mountain;
      break;
    case 'fox':
      bgColor = theme.foxColors.mountain;
      break;
    case 'eagle':
      bgColor = theme.eagleColors.mountain;
      break;
    case 'crocodile':
      bgColor = theme.crocodileColors.mountain;
      break;
    case 'unicorn':
      bgColor = theme.unicornColors.mountain2;
      break;
    case 'lion':
      bgColor = theme.lionColors.mountain;
      break;
    default:
      bgColor = theme.colors.mainWhite;
  }
  return (
    <ProfileWrapper>
      <StyledCharacter $bgColor={bgColor}>
        <CharacterImage $bgImage={userProfile.profileImg} />
      </StyledCharacter>
      <ModalText>{userProfile.nickname}</ModalText>
    </ProfileWrapper>
  );
}

export default ProfileBtn;
