import styled from 'styled-components';

const Ground = styled.div<{ color: string }>`
  width: 100%;
  height: 35%;
  background-color: ${(props) => props.color};
  position: fixed;
  bottom: 0;
  z-index: 30;
`;

export default Ground;
