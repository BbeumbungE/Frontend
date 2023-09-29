import styled from 'styled-components';
import { ReactComponent as Rupee } from '../../assets/image/etc/rupee.svg';

interface RupeeProps {
  value: number;
}

const RupeeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.0313rem;
`;

const SmallRupee = styled(Rupee)`
  width: 1.625rem;
  height: 1.625rem;
  margin: 0.0625rem;
`;

const RupeeText = styled.span`
  font-family: 'TmoneyRoundWindRegular';
  margin: 0.125rem;
  font-size: 1.5625rem;
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
