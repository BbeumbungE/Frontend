import styled from 'styled-components';
import { ReactComponent as Rupee } from '../../assets/image/etc/rupee.svg';

interface RupeeProps {
  value: number;
}

const RupeeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5px;
`;

const SmallRupee = styled(Rupee)`
  width: 26px;
  height: 26px;
  margin: 1px;
`;

const RupeeText = styled.span`
  font-family: 'TmoneyRoundWindRegular';
  margin: 2px;
  font-size: 25px;
  /* color: ${(props) => props.theme.colors.mainBlack}; */
  color: #000000;
`;

const ItemRupee = ({ value }: RupeeProps) => {
  return (
    <RupeeWrapper>
      <SmallRupee />
      <RupeeText>{value}</RupeeText>
    </RupeeWrapper>
  );
};

export default ItemRupee;
