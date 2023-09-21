import styled from 'styled-components';
import theme from '../../style/theme';
import LargeItemRupee from '../atoms/LargeItemRupee';
import Button from '../atoms/Button';

interface DetailStoreItemProps {
  itemimg: string;
  itemvalue: number;
  noClick: () => void;
  okClick: () => void;
}

const ItemDiv = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  /* transform: translate(-50%, -50%); */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 105;
  margin: 15px 25px;
`;

const CircleDiv = styled.div`
  position: absolute;
  width: 400px;
  height: 333px;
  top: 33%;
  border-radius: 50%;
  background-color: ${theme.colors.mainWhite};
  z-index: 104;
`;

const ImageDiv = styled.div<{ itemimg: string }>`
  width: 350px;
  height: 350px;
  background-image: ${({ itemimg }) => (itemimg ? `url(${itemimg})` : 'none')};
  background-size: cover;
  background-position: center;
  padding: 0;
  border: 0;
  margin: 15px;
  z-index: 105;
  &:hover {
    transform: translateY(-14px); /* 마우스 오버 시 위로 이동 */
    transition: transform 0.2s ease-in-out; /* 천천히 돌아오도록 트랜지션 설정 */
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  z-index: 105;
`;

const DetailStoreItem = ({
  itemimg = '',
  itemvalue,
  noClick,
  okClick,
}: DetailStoreItemProps) => {
  return (
    <ItemDiv>
      <ImageDiv itemimg={itemimg} />
      <LargeItemRupee value={itemvalue} />
      <ButtonDiv>
        <Button
          buttonText="취소하기"
          color="gray"
          borderColor="white"
          onClick={noClick}
        />
        <Button
          buttonText="구매하기"
          color="yellow"
          borderColor="white"
          onClick={okClick}
        />
      </ButtonDiv>
      <CircleDiv />
    </ItemDiv>
  );
};

export default DetailStoreItem;
