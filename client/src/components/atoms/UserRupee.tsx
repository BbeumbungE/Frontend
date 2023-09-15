import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { ReactComponent as Rupee } from '../../assets/image/etc/rupee.svg';
import { UserRupeeState } from '../../recoil/rupee/atom';

const RupeeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  position: fixed;
  top: 10px;
  right: 10px;
`;

const RupeeText = styled.span`
  font-family: 'TmoneyRoundWindRegular';
  margin: 10px;
  font-size: 30px;
  color: ${(props) => props.theme.colors.mainBlack};
`;

function UserRupee() {
  const [userRupee, setUserRupee] = useRecoilState(UserRupeeState);

  const formattedRupee = userRupee.rupee.toLocaleString();

  return (
    <RupeeWrapper>
      <Rupee />
      <RupeeText>{formattedRupee}</RupeeText>
    </RupeeWrapper>
  );
}

export default UserRupee;
