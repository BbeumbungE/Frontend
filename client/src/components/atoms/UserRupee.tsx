import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { ReactComponent as Rupee } from '../../assets/image/etc/rupee.svg';
import { UserRupeeState } from '../../recoil/rupee/atom';

const RupeeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.625rem;
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  z-index: 300;
`;

const RupeeText = styled.span`
  font-family: 'TmoneyRoundWindRegular';
  margin: 0.625rem;
  font-size: 1.875rem;
  color: ${(props) => props.theme.colors.mainBlack};
`;

const RupeeImg = styled(Rupee)`
  width: 3.4375rem;
  height: 3.4375rem;
`;

function UserRupee() {
  const [userRupee, setUserRupee] = useRecoilState(UserRupeeState);

  let formattedRupee = '';
  if (userRupee.rupee > 0) {
    formattedRupee = userRupee.rupee.toLocaleString();
  } else {
    formattedRupee = '0';
  }

  return (
    <RupeeWrapper>
      <RupeeImg />
      <RupeeText>{formattedRupee}</RupeeText>
    </RupeeWrapper>
  );
}

export default UserRupee;
