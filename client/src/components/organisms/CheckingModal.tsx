import styled, { keyframes } from 'styled-components';
import ProgressBar from '../atoms/ProgressBar';

interface CheckingModalProps {
  imgPath: string | undefined;
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

const ModalWrapper = styled.div`
  width: 800px;
  height: 550px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 600;
  background-color: white;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalText = styled.span`
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 30px;
`;

const ModalLightText = styled.span`
  font-size: 40px;
  font-family: TmoneyRoundWindRegular;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  margin-bottom: 20px;
`;

const TopImage = styled.img`
  width: 300px;
  height: 300px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 15px;
  border-radius: 25px;
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

const InnerWrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  align-items: center;
  text-align: center;
`;

function CheckingModal({ imgPath }: CheckingModalProps) {
  return (
    <ModalWrapper>
      <InnerWrapper>
        <ModalText>AI가 그림을 확인중이에요</ModalText>
        {imgPath ? (
          <TopImage src={imgPath} alt="이 주의 인기 그림" />
        ) : (
          <TopImageSkeleton />
        )}
        <ModalLightText>이 주의 인기 그림</ModalLightText>
        <ProgressBar />
      </InnerWrapper>
    </ModalWrapper>
  );
}

export default CheckingModal;
