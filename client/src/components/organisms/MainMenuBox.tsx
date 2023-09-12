import styled from 'styled-components';
import Menu from '../atoms/Menu';
import CrownIcon from '../../assets/image/etc/crown.svg';
import StoreIcon from '../../assets/image/etc/store.svg';

const MenuWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function MainMenuBox() {
  return (
    <MenuWrapper>
      <Menu buttonText="주제별<br />그리기" color="borderPink" />
      <Menu buttonText="단계별<br />그리기" color="borderGreen" />
      <Menu buttonText="그림<br />보러가기" color="yellow" svgSrc={CrownIcon} />
      <Menu buttonText="상점" color="blue" svgSrc={StoreIcon} />
    </MenuWrapper>
  );
}

export default MainMenuBox;
