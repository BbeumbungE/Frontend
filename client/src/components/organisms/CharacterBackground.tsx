import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { UserProfileState } from '../../recoil/profile/atom';
import WhiteCloud from '../atoms/WhiteCloud';
import HalfMountain from '../atoms/HalfMountain';
import Ground from '../atoms/Ground';
import theme from '../../style/theme';

const BackgroundWrapper = styled.div<{ color: string }>`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  position: fixed;
  overflow: hidden;
  background-color: ${(props) => props.color};
`;

const CloudWrapper = styled.div`
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 10s;
  }
  &:nth-child(3) {
    animation-delay: 5s;
  }
`;

const CharacterBackground = () => {
  const userProfile = useRecoilValue(UserProfileState);
  let skyColor = theme.hamsterColors.sky;
  let cloudColor = theme.hamsterColors.cloud;
  let mountainColor = theme.hamsterColors.mountain;
  let mountainColor2 = theme.hamsterColors.mountain;
  let groundColor = theme.hamsterColors.ground;

  switch (userProfile.character) {
    case 'hamster':
      skyColor = theme.hamsterColors.sky;
      cloudColor = theme.hamsterColors.cloud;
      mountainColor = theme.hamsterColors.mountain;
      groundColor = theme.hamsterColors.ground;
      break;
    case 'otter':
      skyColor = theme.otterColors.sky;
      cloudColor = theme.otterColors.cloud;
      mountainColor = theme.otterColors.mountain;
      groundColor = theme.otterColors.ground;
      break;
    case 'fox':
      skyColor = theme.foxColors.sky;
      cloudColor = theme.foxColors.cloud;
      mountainColor = theme.foxColors.mountain;
      groundColor = theme.foxColors.ground;
      break;
    case 'eagle':
      skyColor = theme.eagleColors.sky;
      cloudColor = theme.eagleColors.cloud;
      mountainColor = theme.eagleColors.mountain;
      groundColor = theme.eagleColors.ground;
      break;
    case 'crocodile':
      skyColor = theme.crocodileColors.sky;
      cloudColor = theme.crocodileColors.cloud;
      mountainColor = theme.crocodileColors.mountain;
      groundColor = theme.crocodileColors.ground;
      break;
    case 'unicorn':
      skyColor = theme.unicornColors.sky;
      cloudColor = theme.unicornColors.cloud;
      mountainColor = theme.unicornColors.mountain1;
      mountainColor2 = theme.unicornColors.mountain2;
      groundColor = theme.unicornColors.ground;
      break;
    case 'lion':
      skyColor = theme.lionColors.sky;
      cloudColor = theme.lionColors.cloud;
      mountainColor = theme.lionColors.mountain;
      groundColor = theme.lionColors.ground;
      break;
    default:
      skyColor = theme.hamsterColors.sky;
      cloudColor = theme.hamsterColors.cloud;
      mountainColor = theme.hamsterColors.mountain;
      groundColor = theme.hamsterColors.ground;
  }

  return (
    <BackgroundWrapper color={skyColor}>
      <WhiteCloud
        width="200px"
        height="100px"
        top="30px"
        left="0px"
        color={cloudColor}
      />
      <WhiteCloud
        width="120px"
        height="70px"
        top="130px"
        left="0px"
        color={cloudColor}
      />
      <WhiteCloud
        width="150px"
        height="90px"
        top="280px"
        left="0px"
        color={cloudColor}
      />
      <HalfMountain
        width="500px"
        height="400px"
        top="300px"
        left="-180px"
        color={mountainColor}
      />
      <HalfMountain
        width="500px"
        height="400px"
        top="350px"
        left="220px"
        color={mountainColor}
      />
      <HalfMountain
        width="600px"
        height="500px"
        top="330px"
        left="600px"
        color={mountainColor}
      />
      <HalfMountain
        width="600px"
        height="500px"
        top="330px"
        left="1080px"
        color={mountainColor}
      />
      <Ground color={groundColor} />
    </BackgroundWrapper>
  );
};

export default CharacterBackground;
