import styled from 'styled-components';
import theme from '../../style/theme';
import LargeItemRupee from '../atoms/LargeItemRupee';
import Button from '../atoms/Button';

interface DetailStoreItemProps {
  itemimg: string;
  itemvalue: number;
  handleCancel: () => void;
  handleBuy: () => void;
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

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1.25rem;
  z-index: 405;
`;

const DetailStoreItem = ({
  itemimg = '',
  itemvalue,
  handleCancel,
  handleBuy,
}: DetailStoreItemProps) => {
  return (
    <CenterDiv>
      <ItemDiv>
        <ImageDiv itemimg={itemimg} />
        <LargeItemRupee value={itemvalue} />
        <ButtonDiv>
          <Button
            buttonText="취소하기"
            color="gray"
            borderColor="white"
            onClick={handleCancel}
          />
          <Button
            buttonText="구매하기"
            color="yellow"
            borderColor="white"
            onClick={handleBuy}
          />
        </ButtonDiv>
        <CircleDiv />
      </ItemDiv>
    </CenterDiv>
  );
};

export default DetailStoreItem;
