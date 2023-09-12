import styled from 'styled-components';
import Menu from '../atoms/Menu';

const MenuWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function MenuBox() {
  return (
    <MenuWrapper>
      <Menu buttonText="주제별<br />그리기" color="borderPink" />
      <Menu buttonText="단계별<br />그리기" color="borderGreen" />
      <Menu buttonText="그림<br />보러가기" color="yellow" />
      <Menu buttonText="상점" color="blue" />
    </MenuWrapper>
  );
}

export default MenuBox;
