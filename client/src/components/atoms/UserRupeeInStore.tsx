import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import theme from '../../style/theme';
import { ReactComponent as Rupee } from '../../assets/image/etc/rupee.svg';
import { UserRupeeState } from '../../recoil/rupee/atom';

const RupeeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.625rem;
  border-radius: 3.125rem;
  background-color: ${theme.colors.mainWhite};
  position: relative;
  top: 0.625rem;
  right: 0.625rem;
`;

const RupeeImg = styled(Rupee)`
  position: absolute;
  left: -1.375rem;
  width: 3.4375rem;
  height: 3.4375rem;
`;
const RupeeText = styled.span`
  font-family: 'TmoneyRoundWindRegular';
  margin: 0.625rem;
  font-size: 1.875rem;
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
