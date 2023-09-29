import styled, { keyframes } from 'styled-components';
import theme from '../../style/theme';
import LargeItemRupee from '../atoms/LargeItemRupee';
import ProgressBarWithoutRed from '../atoms/ProgressBarWithoutRed';
import stamp from '../../assets/image/etc/stamp.svg';

interface DetailStoreItemProps {
  itemimg: string;
  itemvalue: number;
}
const CenterDiv = styled.div`
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 405;
`;

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 405;
  margin: 0.9375rem 1.5625rem;
`;

const CircleDiv = styled.div`
  position: absolute;
  width: 25rem;
  height: 20.8125rem;
  top: 33%;
  border-radius: 50%;
  background-color: ${theme.colors.mainWhite};
  z-index: 104;
`;

const ImageDiv = styled.div<{ itemimg: string }>`
  width: 21.875rem;
  height: 21.875rem;
  background-image: ${({ itemimg }) => (itemimg ? `url(${itemimg})` : 'none')};
  background-size: cover;
  background-position: center;
  padding: 0;
  border: 0;
  margin: 0.9375rem;
  z-index: 405;
  &:hover {
    transform: translateY(-0.875rem); /* 마우스 오버 시 위로 이동 */
    transition: transform 0.2s ease-in-out; /* 천천히 돌아오도록 트랜지션 설정 */
  }
`;

const BarDiv = styled.div`
  width: 25rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1.5625rem;
  z-index: 407;
`;

const StampAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0;
  }
  90% {
    transform: scale(5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const StampImage = styled.img`
  position: absolute;
  top: 30%;
  left: 5%;
  animation: ${StampAnimation} 1s ease-in-out;
  z-index: 406;
  width: 24.9375rem;
  height: 16.5625rem;
`;

const DetailStoreItemBuy = ({
  itemimg = '',
  itemvalue,
}: DetailStoreItemProps) => {
  return (
    <CenterDiv>
      <ItemDiv>
        <ImageDiv itemimg={itemimg} />
        <LargeItemRupee value={itemvalue} />
        <BarDiv>
          <ProgressBarWithoutRed durationInSeconds={3} />
        </BarDiv>
        <CircleDiv />
        <StampImage src={stamp} alt="Stamp" />
      </ItemDiv>
    </CenterDiv>
  );
};

export default DetailStoreItemBuy;
