import styled from 'styled-components';
import { ReactComponent as Rupee } from '../../assets/image/etc/rupee.svg';

interface RupeeProps {
  value: number;
}

const RupeeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
  z-index: 105;
`;

const LargeRupee = styled(Rupee)`
  width: 42px;
  height: 42px;
  margin: 6px;
`;

const RupeeText = styled.span`
  font-family: 'TmoneyRoundWindRegular';
  margin: 4px;
  font-size: 40px;
  /* color: ${(props) => props.theme.colors.mainBlack}; */
  color: #000000;
`;

const ItemRupee = ({ value }: RupeeProps) => {
  return (
    <RupeeWrapper>
      <LargeRupee />
      <RupeeText>{value}</RupeeText>
    </RupeeWrapper>
  );
};

export default ItemRupee;
