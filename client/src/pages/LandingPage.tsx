import styled from 'styled-components';
import React, { useEffect } from 'react';
import theme from '../style/theme';
import ItemRupee from '../components/atoms/ItemRupee';
import Button from '../components/atoms/Button';
import PicturePost from '../components/atoms/PicturePostDiv';
import tang from '../tang.png';
import StoreItem from '../components/organisms/StoreItem';
import DetailStoreItem from '../components/organisms/DetailStoreItem';

function LandingPage() {
  useEffect(() => {
    console.log('f');
  }, []);
  return (
    <div
      style={{
        backgroundColor: `${theme.storeColors.lightYellow}`,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '100vh',
        padding: '0px',
      }}
    >
      <h1>Landing Page</h1>
      {/* <Tmpdiv>
        <PicturePost imgSrc={tang} onClick={() => console.log('s')} />
        <ItemRupee value={300} />
        <Button buttonText="구매하기" color="yellow" />
        <TmpCircle />
      </Tmpdiv> */}
      <DetailStoreItem
        itemimg={tang}
        itemvalue={500}
        handleCancel={() => console.log('no')}
        handleBuy={() => console.log('ok')}
      />
      {/* <StoreItem itemimg={tang} itemvalue={250} />
      <StoreItem itemimg={tang} itemvalue={5000} /> */}
    </div>
  );
}

export default LandingPage;
