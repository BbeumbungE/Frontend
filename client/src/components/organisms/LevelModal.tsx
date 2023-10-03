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
  margin-top: 50px;
  width: 600px;
  height: 554px;
  border-radius: 25px;
  background: #f3cf6e;
  box-shadow: 6px -8px 10px 0px rgba(0, 0, 0, 0.25) inset;
  position: relative;
  z-index: 600;
`;

const InModal = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 500px;
  border-radius: 25px;
  background: #fff3db;
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopModal = styled.div`
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  margin-left: auto;
  margin-right: auto;
  width: 250px;
  height: 130px;
  border-radius: 25px;
  background: #fff3db;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
`;

const LevelText = styled.span`
  color: #97560d;
  font-family: SBAggroB;
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  text-shadow: 0px -1px 3px #23232380;
`;

const StarsWrapper = styled.div`
  position: absolute;
  bottom: -140px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 700;
`;

const LevelSketch = styled.img`
  width: 300px;
  height: 280px;
  margin-bottom: 20px;
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
