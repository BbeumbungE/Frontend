import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import theme from '../../style/theme';
import { ReactComponent as Rupee } from '../../assets/image/etc/rupee.svg';
import { UserRupeeState } from '../../recoil/rupee/atom';

const RupeeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  border-radius: 50px;
  background-color: ${theme.colors.mainWhite};
  position: relative;
  top: 10px;
  right: 10px;
`;

const RupeeImg = styled(Rupee)`
  position: absolute;
  left: -22px;
`;
const RupeeText = styled.span`
  font-family: 'TmoneyRoundWindRegular';
  margin: 10px;
  font-size: 30px;
  white-space: pre-wrap;
  color: ${(props) => props.theme.colors.mainBlack};
`;

function UserRupeeInStore() {
  const [userRupee, setUserRupee] = useRecoilState(UserRupeeState);

  let formattedRupee = '';
  if (userRupee.rupee > 0) {
    formattedRupee = `      ${userRupee.rupee.toLocaleString()}`;
  } else {
    formattedRupee = '      0';
  }
  return (
    <RupeeWrapper>
      <RupeeImg />
      <RupeeText>{formattedRupee}</RupeeText>
    </RupeeWrapper>
  );
}

export default UserRupeeInStore;
