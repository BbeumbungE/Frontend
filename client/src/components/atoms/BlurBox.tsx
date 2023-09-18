import React from 'react';
import styled from 'styled-components';

const BlurBox = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 100;
`;

const BlurBoxDiv = () => {
  return <BlurBox />;
};
export default BlurBoxDiv;
