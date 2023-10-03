import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { UserProfileState } from '../../recoil/profile/atom';
import theme from '../../style/theme';
import SoundEffects from '../../sounds/SoundEffects';

interface ProfileBtnProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
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
  width: 6.25rem;
  height: 6.25rem;
  margin: 0.625rem;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.$bgColor};
  cursor: pointer;
  z-index: 100;
`;

const CharacterImage = styled.div<{ $bgImage: string | null }>`
  width: 5rem;
  height: 5rem;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 200;
`;

const ModalText = styled.span`
  font-family: 'TmoneyRoundWindRegular';
  font-size: 1.875rem;
  color: ${(props) => props.theme.colors.mainBlack};
`;

function ProfileBtn({ onClick }: ProfileBtnProps) {
  const [userProfile, setUserProfile] = useRecoilState(UserProfileState);
  const { playBtnBright } = SoundEffects();
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    playBtnBright(); // 버튼 클릭시 효과음 실행
    if (onClick) {
      onClick(event); // 만약 외부에서 전달된 onClick 핸들러가 있다면 실행
    }
  };
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
      <StyledCharacter $bgColor={bgColor} onClick={handleClick}>
        <CharacterImage $bgImage={userProfile.profileImg} />
      </StyledCharacter>
      <ModalText>{userProfile.nickname}</ModalText>
    </ProfileWrapper>
  );
}

export default ProfileBtn;
