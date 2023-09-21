import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import theme from '../style/theme';
import tang from '../tang.png';
import ExitBox from '../components/organisms/ExitBox';
import StoreItem from '../components/organisms/StoreItem';
import DetailStoreItem from '../components/organisms/DetailStoreItem';
import Button from '../components/atoms/Button';
import UserRupee from '../components/atoms/UserRupee';
import BlurBox from '../components/atoms/BlurBox';

const StorePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.storeColors.lightYellow};
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0px 30px;
  width: 1000px;
`;

const HeadBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 950px;
  margin-top: 23px;
`;

const UserRupeeWrapper = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  border-radius: 50px;
  background-color: ${theme.colors.mainWhite};
`;

const ExitBoxWrapper = styled.div`
  position: fixed;
  top: 3%;
  left: 0%;
`;

function StorePage() {
  const [isProfile, setIsProfile] = useState<boolean>(true);
  const [isTitle, setIsTitle] = useState<boolean>(false);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  return (
    <StorePageContainer>
      {isDetail && (
        <>
          <BlurBox />
          <DetailStoreItem
            itemimg={tang}
            itemvalue={500}
            noClick={() => setIsDetail(false)}
            okClick={() => console.log('ds')}
          />
        </>
      )}
      <ExitBoxWrapper>
        <ExitBox color="dark" />
      </ExitBoxWrapper>
      {/* <UserRupeeWrapper> */}
      <UserRupee />
      {/* </UserRupeeWrapper> */}
      <HeadBtnContainer>
        {isProfile ? (
          <Button
            buttonText="프로필 캐릭터"
            color="white"
            onClick={() => console.log('c')}
          />
        ) : (
          <Button
            buttonText="프로필 캐릭터"
            color="yellow"
            onClick={() => {
              setIsProfile(true);
              setIsTitle(false);
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
              setIsTitle(true);
              setIsProfile(false);
            }}
          />
        )}
      </HeadBtnContainer>
      <ItemContainer>
        <StoreItem
          itemimg={tang}
          itemvalue={250}
          onClick={() => setIsDetail(true)}
        />
        <StoreItem
          itemimg={tang}
          itemvalue={5000}
          onClick={() => setIsDetail(true)}
        />
        <StoreItem
          itemimg={tang}
          itemvalue={250}
          onClick={() => setIsDetail(true)}
        />
        <StoreItem
          itemimg={tang}
          itemvalue={5000}
          onClick={() => setIsDetail(true)}
        />
        <StoreItem
          itemimg={tang}
          itemvalue={250}
          onClick={() => setIsDetail(true)}
        />
        <StoreItem
          itemimg={tang}
          itemvalue={5000}
          onClick={() => setIsDetail(true)}
        />
        <StoreItem
          itemimg={tang}
          itemvalue={250}
          onClick={() => setIsDetail(true)}
        />
        {/* <StoreItem itemimg={tang} itemvalue={5000} /> */}
      </ItemContainer>
    </StorePageContainer>
  );
}

export default StorePage;
