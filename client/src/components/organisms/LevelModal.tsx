import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { StageIdState } from '../../recoil/stage/atom';
import LevelStars from './LevelStars';
import Button from '../atoms/Button';

interface LevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  stageId: number;
  levelData: number;
  imgSrc: string;
  star: number;
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 3.125rem;
  width: 37.5rem;
  height: 34.625rem;
  border-radius: 1.5625rem;
  background: #f3cf6e;
  box-shadow: 0.375rem -0.5rem 0.625rem 0rem rgba(0, 0, 0, 0.25) inset;
  position: relative;
  z-index: 600;
`;

const InModal = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 31.25rem;
  height: 31.25rem;
  border-radius: 1.5625rem;
  background: #fff3db;
  box-shadow: 0rem 0.375rem 0.75rem 0rem rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopModal = styled.div`
  position: absolute;
  top: -5rem;
  left: 50%;
  transform: translateX(-50%);
  margin-left: auto;
  margin-right: auto;
  width: 15.625rem;
  height: 8.125rem;
  border-radius: 1.5625rem;
  background: #fff3db;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
`;

const LevelText = styled.span`
  color: #97560d;
  font-family: SBAggroB;
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 400;
  text-shadow: 0rem -0.0625rem 0.1875rem #23232380;
`;

const StarsWrapper = styled.div`
  position: absolute;
  bottom: -8.75rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  position: relative;
  z-index: 700;
`;

const LevelSketch = styled.img`
  width: 18.75rem;
  height: 17.5rem;
  margin-bottom: 1.25rem;
`;

function LevelModal({
  isOpen,
  onClose,
  stageId,
  levelData,
  imgSrc,
  star,
}: LevelModalProps) {
  const navigate = useNavigate();
  const [stageIdState, setStageIdState] = useRecoilState(StageIdState);

  console.log('스테이지 리코일 정보', stageIdState);
  if (!isOpen) return null;

  const handleClose = () => {
    console.log('취소하기');
    onClose();
  };

  const handleChallenge = () => {
    setStageIdState((prevStageIdState) => ({
      ...prevStageIdState,
      currentStageId: stageId,
    }));
    navigate('/draw/stage');
  };

  return (
    <ModalWrapper>
      <TopModal>
        <LevelText>레벨 {levelData}</LevelText>
      </TopModal>
      <InModal>
        <LevelSketch src={imgSrc} />
        <StarsWrapper>
          <LevelStars star={star} />
        </StarsWrapper>
        <BtnWrapper>
          <Button
            buttonText="취소하기"
            color="lightGray"
            onClick={handleClose}
          />
          <Button
            buttonText="도전하기"
            color="salmon"
            borderColor="#F24F41"
            onClick={handleChallenge}
          />
        </BtnWrapper>
      </InModal>
    </ModalWrapper>
  );
}

export default LevelModal;
