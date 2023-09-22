import styled from 'styled-components';
import theme from '../../style/theme';
import ItemRupee from '../atoms/ItemRupee';
import Button from '../atoms/SmallButton';
import stamp from '../../assets/image/etc/stamp.svg';

interface StoreItemProps {
  itemimg: string;
  itemvalue: number;
  onClick: () => void;
  alreadyGet: boolean;
}

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  margin: 15px 25px;
`;

const CircleDiv = styled.div`
  position: absolute;
  width: 210px;
  height: 178px;
  top: 33%;
  border-radius: 50%;
  background-color: ${theme.colors.mainWhite};
  z-index: -1;
`;

const ImageDiv = styled.div<{ itemimg: string }>`
  width: 177px;
  height: 177px;
  background-image: ${({ itemimg }) => (itemimg ? `url(${itemimg})` : 'none')};
  background-size: cover;
  background-position: center;
  padding: 0;
  border: 0;
  margin: 2px;
  &:hover {
    transform: translateY(-10px); /* 마우스 오버 시 위로 이동 */
    transition: transform 0.1s ease-in-out; /* 천천히 돌아오도록 트랜지션 설정 */
  }
`;

const StoreItem = ({
  itemimg = '',
  itemvalue,
  onClick,
  alreadyGet,
}: StoreItemProps) => {
  return (
    <ItemDiv>
      {alreadyGet ? (
        <>
          <ImageDiv itemimg={itemimg} />
          <ItemRupee value={itemvalue} />
          <Button
            buttonText="보유중"
            color="lightGray"
            borderColor="lightGray"
            onClick={() => console.log('보유 중 알림')}
            cursor="not-allowed"
          />
          <CircleDiv />
        </>
      ) : (
        <>
          <ImageDiv itemimg={itemimg} />
          <ItemRupee value={itemvalue} />
          <Button
            buttonText="구매하기"
            color="yellow"
            borderColor="white"
            onClick={onClick}
            cursor="pointer"
          />
          <CircleDiv />
        </>
      )}
    </ItemDiv>
  );
};

export default StoreItem;
