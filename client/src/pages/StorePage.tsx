import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useRecoilValue, useRecoilState } from 'recoil';
import { UserProfileState } from '../recoil/profile/atom';
import { UserRupeeState } from '../recoil/rupee/atom';
import theme from '../style/theme';
import ExitBox from '../components/organisms/ExitBox';
import StoreItem from '../components/organisms/StoreItem';
import DetailStoreItem from '../components/organisms/DetailStoreItem';
import DetailStoreItemBuy from '../components/organisms/DetailStoreItemBuy';
import UserRupee from '../components/atoms/UserRupeeInStore';
import Button from '../components/atoms/Button';
import BlurBox from '../components/atoms/BlurBox';
import { getPictureTitles, getAvatars, buyItem } from '../api/item';
import { patchRupee } from '../api/rupee';

const StorePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6.25rem;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.storeColors.lightYellow};
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0rem 1.875rem;
  width: 62.5rem;
`;

const HeadBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 59.375rem;
  margin-top: 1.4375rem;
`;

const UserRupeeWrapper = styled.div`
  position: fixed;
  top: 1.875rem;
  right: 18.75rem;
  z-index: 301;
`;

const ExitBoxWrapper = styled.div`
  position: fixed;
  top: 3%;
  left: 0%;
`;

function StorePage() {
  const userProfile = useRecoilValue(UserProfileState);
  const [userRupee, setUserRupee] = useRecoilState(UserRupeeState);

  const [itemList, setItemList] = useState<any>({});
  const [curPage, setCurPage] = useState<number>(0);
  const [detailItemId, setDetailItemId] = useState<number>(0);
  const [detailItemImg, setDetailItemImg] = useState<string>('');
  const [detailPrice, setDetailPrice] = useState<number>(0);
  const [isAvatar, setIsAvatar] = useState<boolean>(true);
  const [isTitle, setIsTitle] = useState<boolean>(false);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [isBuy, setIsBuy] = useState<boolean>(false);

  useEffect(() => {
    loadItems(userProfile.profileId, curPage);
    console.log(itemList);
  }, [isAvatar, isTitle, curPage]);
  async function loadItems(profileId: number, currentPage: number) {
    console.log(userRupee);

    try {
      if (isAvatar) {
        const response = await getAvatars(profileId, currentPage);
        const newItems = { ...response.content };
        await setItemList(newItems);
        console.log(newItems);
      }
      if (isTitle) {
        const response = await getPictureTitles(profileId, currentPage);
        const newItems = { ...response.content };
        await setItemList(newItems);
        console.log(newItems);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleBuy = async (profileId: number, itemId: number) => {
    const curRupee = userRupee.rupee;
    console.log(curRupee);
    if (curRupee >= detailPrice) {
      try {
        if (isAvatar) {
          const response = await buyItem(profileId, itemId, 'avatar');
          console.log(response);
        }
        if (isTitle) {
          const response = await buyItem(profileId, itemId, 'subject');
          console.log(response);
        }
        setIsBuy(true);
        setUserRupee((prevRupee) => ({ rupee: prevRupee.rupee - detailPrice }));
        patchRupee(userProfile.profileId, curRupee - detailPrice);
        // 3050ms 후에 setIsBuy(false) 실행 (프로그레스 바 3000ms)
        setTimeout(() => {
          loadItems(userProfile.profileId, curPage);
          setIsBuy(false);
          setIsDetail(false);
        }, 3050);
      } catch (error) {
        Swal.fire({
          title: '에러가 발생했습니다',
          width: '25rem',
        });
        console.log(error);
      }
    } else {
      Swal.fire({
        title: 'Rupee가 부족해요',
        width: '25rem',
      });
    }
  };
  return (
    <StorePageContainer>
      {isDetail && (
        <>
          <BlurBox />
          {isBuy ? (
            <DetailStoreItemBuy
              itemimg={detailItemImg}
              itemvalue={detailPrice}
            />
          ) : (
            <DetailStoreItem
              itemimg={detailItemImg}
              itemvalue={detailPrice}
              handleCancel={() => setIsDetail(false)}
              handleBuy={() => {
                handleBuy(userProfile.profileId, detailItemId);
              }}
            />
          )}
        </>
      )}
      <ExitBoxWrapper>
        <ExitBox color="dark" />
      </ExitBoxWrapper>
      <UserRupeeWrapper>
        <UserRupee />
      </UserRupeeWrapper>
      <HeadBtnContainer>
        {isAvatar ? (
          <Button
            buttonText="프로필 캐릭터"
            color="white"
            onClick={() => {
              setUserRupee((prevRupee) => ({
                rupee: prevRupee.rupee + 1000,
              }));

              patchRupee(userProfile.profileId, 1000);
            }}
          />
        ) : (
          <Button
            buttonText="프로필 캐릭터"
            color="yellow"
            onClick={() => {
              setIsTitle(false);
              setIsAvatar(true);
            }}
          />
        )}
        {isTitle ? (
          <Button
            buttonText="   그림 주제    "
            color="white"
            onClick={() => console.log('c')}
          />
        ) : (
          <Button
            buttonText="   그림 주제    "
            color="yellow"
            onClick={() => {
              setIsAvatar(false);
              setIsTitle(true);
            }}
          />
        )}
      </HeadBtnContainer>
      {itemList.data && itemList.data[0].avatarResponse && (
        <ItemContainer>
          {itemList.data.map((item: any) => (
            <StoreItem
              key={item.id}
              itemimg={item.avatarResponse.avatarImage}
              itemvalue={item.itemPrice}
              alreadyGet={item.hasItem}
              onClick={() => {
                setDetailItemId(item.id);
                setDetailItemImg(item.avatarResponse.avatarImage);
                setDetailPrice(item.itemPrice);
                setIsDetail(true);
              }}
            />
          ))}
        </ItemContainer>
      )}
      {itemList.data && itemList.data[0].subject && (
        <ItemContainer>
          {itemList.data.map((item: any) => (
            <StoreItem
              key={item.id}
              itemimg={item.subject.subjectImage}
              itemvalue={item.itemPrice}
              alreadyGet={item.hasItem}
              onClick={() => {
                setDetailItemId(item.id);
                setDetailItemImg(item.subject.subjectImage);
                setDetailPrice(item.itemPrice);
                setIsDetail(true);
              }}
            />
          ))}
        </ItemContainer>
      )}
    </StorePageContainer>
  );
}

export default StorePage;
