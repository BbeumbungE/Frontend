import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { UserProfileState } from '../../recoil/profile/atom';
import BlurBox from '../atoms/BlurBox';
import LevelStars from './LevelStars';
import { ReactComponent as Rupee } from '../../assets/image/etc/rupee.svg';
import Button from '../atoms/Button';
import theme from '../../style/theme';

const pulseAnimation = keyframes`
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.4;
  }
`;

const transpWhite = '#ffffff5e';

const sparkle = keyframes`
  50% {
    opacity: 0.4;
    transform: scale(7);
    box-shadow: 0px 0px 30px 20px ${transpWhite};
  }
  50% {
    opacity: 1;
    transform: scale(7);
    box-shadow: 0px 0px 30px 20px white;
  }
  100% {
    opacity: 0;
    transform: scale(7.5);
    box-shadow: 0px 0px 30px 20px ${transpWhite};
  }
`;

const jumpAnimation = keyframes`
  0% {
    bottom: 0;
  }
  50% {
    bottom: 20px;
  }
  100% {
    bottom: 0;
  }
`;

const Star = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  opacity: 0;
  animation: ${sparkle} 4s infinite alternate;
  z-index: 0;
  margin-bottom: 250px;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 50px;
  width: 500px;
  height: 660px;
  border-radius: 25px;
  position: relative;
  z-index: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopImage = styled.img`
  width: 350px;
  height: 350px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 15px;
  border-radius: 25px;
  position: relative;
  z-index: 100;
`;

const TopImageSkeleton = styled.div`
  width: 300px;
  height: 300px;
  background-color: #ccc;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 15px;
  animation: ${pulseAnimation} 1.5s infinite;
  border-radius: 25px;
`;

const ModalText = styled.div`
  font-size: 80px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 30px;
  color: ${theme.colors.mainWhite};
  -webkit-text-stroke: 3px #99d06a;
  margin-top: -50px;
  position: stati7;
  z-index: 100;
`;

const RupeeWrapper = styled.span`
  width: 300px;
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 40px;
`;

const RupeeIcon = styled(Rupee)`
  width: 50px;
  height: 50px;
`;

const RupeeText = styled.span`
  font-size: 40px;
  color: ${theme.colors.mainWhite};
  font-style: normal;
  font-weight: 400;
  margin-bottom: 30px;
  text-align: center;
  line-height: 40px;
`;

const CharacterImage = styled.div<{
  $bgImage: string | null;
  $position: { left: number; bottom: number };
}>`
  width: 500px;
  height: 500px;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 150;
  transition:
    right 1s ease,
    bottom 1s ease;
  left: ${(props) => `${props.$position.left}px`};
  bottom: ${(props) => `${props.$position.bottom}px`};
  animation: ${jumpAnimation} 1s infinite;
`;

function StageRecordModal() {
  const userProfile = useRecoilValue(UserProfileState);

  return (
    <>
      <BlurBox />
      <ModalWrapper>
        <LevelStars star={2} />

        <Star />
        {/* {imgPath ? ( */}
        <TopImage
          src="https://aicanvas-mw.s3.ap-northeast-2.amazonaws.com/profile/25/canvas/shoe/1695365797316175902.JPG"
          alt="최종 변환된 그림"
        />
        {/* ) : (
        <TopImageSkeleton />
      )} */}
        <ModalText>축하합니다</ModalText>
        <RupeeWrapper>
          <RupeeIcon />
          <RupeeText>40</RupeeText>
        </RupeeWrapper>
        <Button buttonText="확인" color="salmon" borderColor="#F24F41" />
      </ModalWrapper>
      <CharacterImage
        $bgImage={userProfile.profileImg}
        $position={{ left: 0, bottom: 0 }}
      />
    </>
  );
}

export default StageRecordModal;
