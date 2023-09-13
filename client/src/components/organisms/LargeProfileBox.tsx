import styled from 'styled-components';
import LargeProfileName from '../atoms/LargeProfileName';
import LargeProfileImg from '../atoms/LargeProfileImg';

interface LargeProfileBoxProps {
  ProfileCharacter: string;
  ProfileImage: string;
  ProfileName: string;
}

const LargeProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LargeProfile = ({
  ProfileCharacter,
  ProfileImage,
  ProfileName,
}: LargeProfileBoxProps) => {
  return (
    <LargeProfileWrapper>
      <LargeProfileImg
        imgsrc={ProfileImage}
        profileCharacter={ProfileCharacter}
      />
      <LargeProfileName name={ProfileName} />
    </LargeProfileWrapper>
  );
};

export default LargeProfile;
