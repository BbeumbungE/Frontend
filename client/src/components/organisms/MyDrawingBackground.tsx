import styled from 'styled-components';
import WhiteCloud from '../atoms/WhiteCloud';
import HalfMountain from '../atoms/HalfMountain';
import Ground from '../atoms/Ground';

const BackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background-color: #f4f6ed;
  position: fixed;
  overflow: hidden;
`;

const MyDrawingBackground = () => {
  return (
    <BackgroundWrapper>
      <WhiteCloud
        width="200px"
        height="100px"
        top="30px"
        left="-80px"
        color="#FBFCF6"
      />
      <WhiteCloud
        width="120px"
        height="50px"
        top="130px"
        left="0px"
        color="#FBFCF6"
      />
      <WhiteCloud
        width="130px"
        height="70px"
        top="230px"
        left="-30px"
        color="#FBFCF6"
      />
      <HalfMountain
        width="500px"
        height="400px"
        top="300px"
        left="-180px"
        color="#E2EDD3"
      />
      <HalfMountain
        width="500px"
        height="400px"
        top="350px"
        left="220px"
        color="#E2EDD3"
      />
      <HalfMountain
        width="600px"
        height="500px"
        top="330px"
        left="600px"
        color="#E2EDD3"
      />
      <HalfMountain
        width="600px"
        height="500px"
        top="330px"
        left="1080px"
        color="#E2EDD3"
      />
      <Ground color="#D1DFBC" />
    </BackgroundWrapper>
  );
};

export default MyDrawingBackground;
