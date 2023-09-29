import styled from 'styled-components';
import theme from '../../style/theme';

interface LargeProfileImgProps {
  imgsrc?: string;
  profileCharacter?: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
ProfileImg.defaultProps = {
  imgsrc: '',
  profileCharacter: 'hamster',
};
const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCharacter = styled.div<{ $bgColor: string }>`
  display: inline-block;
  width: 20.125rem;
  height: 20.125rem;
  margin: 0.625rem;
  padding: 2.5rem;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.$bgColor};
  cursor: pointer;
  z-index: 200;
`;

const CharacterImage = styled.div<{ $bgImage: string }>`
  width: 15.125rem;
  height: 15.125rem;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 100;
`;

function ProfileImg({
  imgsrc = '',
  profileCharacter,
  onClick,
}: LargeProfileImgProps) {
  let bgColor = theme.colors.mainWhite; // 기본값은 mainBlue

  switch (profileCharacter) {
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
      <StyledCharacter $bgColor={bgColor} onClick={onClick}>
        <CharacterImage $bgImage={imgsrc} />
      </StyledCharacter>
    </ProfileWrapper>
  );
}

export default ProfileImg;
