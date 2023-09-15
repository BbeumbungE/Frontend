import styled from 'styled-components';
import UserRupee from '../components/atoms/UserRupee';
import LevelBtn from '../components/atoms/LevelBtn';

const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  position: fixed;
  overflow: hidden;
`;

const BlueSky = styled.div`
  width: 100%;
  height: 30%;
  background: linear-gradient(
    180deg,
    rgba(26, 112, 223, 0.8) 0%,
    rgba(105, 206, 252, 0.8) 100%
  );
  position: relative;
`;

const BigWhiteCloud = styled.div`
  width: 250px;
  height: 140px;
  border-radius: 50%;
  background: var(--white, #fff);
  box-shadow: -18px -18px 58px 0px rgba(0, 0, 0, 0.25) inset;
  z-index: 100;
  position: absolute;
  top: -40px;
  right: 40%;
`;

const SmallWhiteCloud = styled.div`
  width: 150px;
  height: 100px;
  border-radius: 50%;
  background: var(--white, #fff);
  box-shadow: -18px -18px 58px 0px rgba(0, 0, 0, 0.25) inset;
  z-index: 100;
  position: absolute;
  top: 5%;
  right: 22%;
`;

const LevelWrapper = styled.div`
  width: 100%;
  height: 70%;
`;

const GreenGround = styled.div`
  width: 100%;
  height: 70%;
  background: linear-gradient(180deg, #4ca652 0%, #8ecc51 27.6%);
`;

function StageMapPage() {
  return (
    <MapWrapper>
      <BlueSky />
      <BigWhiteCloud />
      <SmallWhiteCloud />
      <UserRupee />
      {/* <LevelWrapper>
        <LevelBtn level={1} />
      </LevelWrapper> */}
      <GreenGround />
    </MapWrapper>
  );
}

export default StageMapPage;
