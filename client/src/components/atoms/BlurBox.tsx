import styled from 'styled-components';

const BlurBox = styled.div`
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 100;
`;

export default BlurBox;
