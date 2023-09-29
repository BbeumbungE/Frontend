import styled from 'styled-components';
import { ReactComponent as Rupee } from '../../assets/image/etc/rupee.svg';

interface RupeeProps {
  value: number;
}

const RupeeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.3125rem;
  z-index: 105;
`;

const LargeRupee = styled(Rupee)`
  width: 2.625rem;
  height: 2.625rem;
  margin: 0.375rem;
`;

const RupeeText = styled.span`
  font-family: 'TmoneyRoundWindRegular';
  margin: 0.25rem;
  font-size: 2.5rem;
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
