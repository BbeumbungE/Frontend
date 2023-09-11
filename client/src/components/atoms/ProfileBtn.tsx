import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { userProfileState } from '../../recoil/profile/atom';
import theme from '../../style/theme';

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCharacter = styled.div<{ $bgColor: string }>`
  display: inline-block;
  width: 120px;
  height: 120px;
  margin: 10px;
  padding: 50px;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.$bgColor};
  cursor: pointer;
  z-index: 200;
`;

const CharacterImage = styled.div<{ $bgImage: string }>`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 100;
`;

const ModalText = styled.span`
  font-family: 'TmoneyRoundWindRegular';
  font-size: 30px;
  color: ${(props) => props.theme.colors.mainBlack};
`;

function ProfileBtn() {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
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
