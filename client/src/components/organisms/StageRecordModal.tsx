import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { UserProfileState } from '../../recoil/profile/atom';
import { UserRupeeState } from '../../recoil/rupee/atom';
import BlurBox from '../atoms/BlurBox';
import LevelStars from './LevelStars';
import { ReactComponent as Rupee } from '../../assets/image/etc/rupee.svg';
import Button from '../atoms/Button';
import theme from '../../style/theme';

interface PointInfo {
  currentPoint: number;
  previousPoint: number;
  rewardPoint: number;
}

interface Content {
  id: number;
  pointInfo: PointInfo;
  score: number;
}
interface Status {
  code: number;
  httpStatus: string;
  message: string;
}

interface StageRecordModalProps {
  finishData: {
    content: Content;
    status: Status;
  };
  canvasUrl: string | null;
}

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
    box-shadow: 0rem 0rem 1.875rem 1.25rem ${transpWhite};
  }
  50% {
    opacity: 1;
    transform: scale(7);
    box-shadow: 0rem 0rem 1.875rem 1.25rem white;
  }
  100% {
    opacity: 0;
    transform: scale(7.5);
    box-shadow: 0rem 0rem 1.875rem 1.25rem ${transpWhite};
  }
`;

const jumpAnimation = keyframes`
  0% {
    bottom: 0;
  }
  50% {
    bottom: 1.25rem;
  }
  100% {
    bottom: 0;
  }
`;

const Star = styled.div`
  position: absolute;
  width: 1.875rem;
  height: 1.875rem;
  background-color: white;
  border-radius: 50%;
  opacity: 0;
  animation: ${sparkle} 4s infinite alternate;
  z-index: 0;
  margin-bottom: 15.625rem;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 3.125rem;
  width: 31.25rem;
  height: 41.25rem;
  border-radius: 1.5625rem;
  position: relative;
  z-index: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopImage = styled.img`
  width: 23.75rem;
  height: 23.75rem;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 0.9375rem;
  border-radius: 1.5625rem;
  position: relative;
  z-index: 100;
`;

const TopImageSkeleton = styled.div`
  width: 18.75rem;
  height: 18.75rem;
  background-color: #ccc;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 0.9375rem;
  animation: ${pulseAnimation} 1.5s infinite;
  border-radius: 1.5625rem;
`;

const ModalText = styled.div`
  font-size: 5rem;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 1.875rem;
  color: ${theme.colors.mainWhite};
  -webkit-text-stroke: 0.1875rem #99d06a;
  margin-top: -3.125rem;
  position: stati7;
  z-index: 100;
`;

const RupeeWrapper = styled.span`
  width: 18.75rem;
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 2.5rem;
`;

const RupeeIcon = styled(Rupee)`
  width: 3.125rem;
  height: 3.125rem;
`;

const RupeeText = styled.span`
  font-size: 2.5rem;
  color: ${theme.colors.mainWhite};
  font-style: normal;
  font-weight: 400;
  margin-bottom: 1.875rem;
  text-align: center;
  line-height: 2.5rem;
`;

const CharacterImage = styled.div<{
  $bgImage: string | null;
  $position: { left: number; bottom: number };
}>`
  width: 31.25rem;
  height: 31.25rem;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 450;
  transition:
    right 1s ease,
    bottom 1s ease;
  left: ${(props) => `${props.$position.left}px`};
  bottom: ${(props) => `${props.$position.bottom}px`};
  animation: ${jumpAnimation} 1s infinite;
`;

function StageRecordModal({ finishData, canvasUrl }: StageRecordModalProps) {
  const navigate = useNavigate();
  const userProfile = useRecoilValue(UserProfileState);
  const [userRupee, setUserRupee] = useRecoilState(UserRupeeState);

  useEffect(() => {
    const updatedRupee =
      userRupee.rupee + finishData.content.pointInfo.rewardPoint;
    setUserRupee({ rupee: updatedRupee });
  }, []);

  console.log('업데이트한 루피!', userRupee);

  const handleConfirm = () => {
    navigate('/stage');
  };

  return (
    <>
      <ModalWrapper>
        <LevelStars star={finishData.content.score} />
        <Star />
        {canvasUrl ? (
          <TopImage src={canvasUrl} alt="최종 변환된 그림" />
        ) : (
          <TopImageSkeleton />
        )}
        <ModalText>축하합니다</ModalText>
        <RupeeWrapper>
          <RupeeIcon />
          <RupeeText>{finishData.content.pointInfo.rewardPoint}</RupeeText>
        </RupeeWrapper>
        <Button
          buttonText="확인"
          color="salmon"
          borderColor="#F24F41"
          onClick={handleConfirm}
        />
      </ModalWrapper>
      <CharacterImage
        $bgImage={userProfile.profileImg}
        $position={{ left: 0, bottom: -100 }}
      />
    </>
  );
}

export default StageRecordModal;
