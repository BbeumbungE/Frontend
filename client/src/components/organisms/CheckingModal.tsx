import styled from 'styled-components';
import ProgressBar from '../atoms/ProgressBar';

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
`;

const ModalLightText = styled.span`
  font-size: 40px;
  font-family: TmoneyRoundWindRegular;
  font-style: normal;
  font-weight: 400;
  text-align: center;
`;

const InnerWrapper = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function CheckingModal() {
  return (
    <ModalWrapper>
      <InnerWrapper>
        <ModalText>AI가 그림을 확인중이에요</ModalText>
        <ModalLightText>이 주의 인기 그림</ModalLightText>
        <ProgressBar />
      </InnerWrapper>
    </ModalWrapper>
  );
}

export default CheckingModal;
