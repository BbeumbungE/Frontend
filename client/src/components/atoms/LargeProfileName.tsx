import styled from 'styled-components';
import theme from '../../style/theme';

interface LargeProfileNameProps {
  name: string;
}

const ProfileNameWrapper = styled.div`
  margin-top: 0.8125rem;
  text-align: center;
  padding: 0;
  font-size: 2.5rem;
  font-family: 'TmoneyRoundWindRegular';
  color: ${theme.colors.mainBlack};
`;

const LargeProfileName = ({ name }: LargeProfileNameProps) => {
  return <ProfileNameWrapper>{name}</ProfileNameWrapper>;
};

export default LargeProfileName;
