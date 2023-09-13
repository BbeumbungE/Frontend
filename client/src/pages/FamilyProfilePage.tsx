import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getProfiles } from '../api/profiles';
import theme from '../style/theme';
import LargeProfile from '../components/organisms/LargeProfileBox';
import NewProfileBox from '../components/organisms/NewProfileBox';
import LargeNewProfileBtn from '../components/atoms/LargeNewProfileBtn';

const ProfilesPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.mainSkyblue};
`;

const ProfilesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const SampleResponse = {
  status: {
    httpStatus: 'OK',
    code: 200,
    message: '올바른 요청입니다.',
  },
  content: {
    profileList: [
      {
        id: 1,
        profileName: '엄한결님',
        profileCharacter: 'crocodile',
        profileImage: `${process.env.REACT_APP_IMG_URL}/item/avatar/crocodile.png`,
        member: {
          userId: '221010c-56a5-4a5a-b51c-21457aa75766',
          email: 'djsruf@nace.com',
        },
      },
      {
        id: 2,
        profileName: '엄한결님2',
        profileCharacter: 'fox',
        profileImage: `${process.env.REACT_APP_IMG_URL}/item/avatar/fox.png`,
        member: {
          userId: '221010c-56a5-4a5a-b51c-21457aa75766',
          email: 'djsruf@nace.com',
        },
      },
    ],
  },
};

function FamilyProfilePage() {
  const [textInputValue, setTextInputValue] = useState<string>('');

  useEffect(() => {
    // getProfiles();
  }, []);
  return (
    <ProfilesPageContainer>
      <h1>FamilyProfilePage</h1>
      <ProfilesContainer>
        {SampleResponse.content.profileList.map((profile) => (
          <LargeProfile
            key={profile.id}
            ProfileCharacter={profile.profileCharacter}
            ProfileImage={profile.profileImage}
            ProfileName={profile.profileName}
          />
        ))}
        {/* <LargeProfile
          ProfileCharacter="crocodile"
          ProfileImage={`${process.env.REACT_APP_IMG_URL}/item/avatar/crocodile.png`}
          ProfileName="악어"
        />
        <LargeProfile
          ProfileCharacter="fox"
          ProfileImage={`${process.env.REACT_APP_IMG_URL}/item/avatar/fox.png`}
          ProfileName="여우여우여우"
        />
        <NewProfileBox
          inputValue={textInputValue}
          onTextInputChange={setTextInputValue}
          onClick={() => {
            setTextInputValue(textInputValue);
            console.log(textInputValue);
          }}
        /> */}
        <LargeNewProfileBtn
          onClick={() => {
            console.log('프로필생성');
          }}
        />
      </ProfilesContainer>
    </ProfilesPageContainer>
  );
}

export default FamilyProfilePage;
