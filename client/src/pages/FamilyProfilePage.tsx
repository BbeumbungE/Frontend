import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserProfileState } from '../recoil/profile/atom';
import { getProfiles, newProfile } from '../api/profiles';
import { deleteUser } from '../api/user';
import theme from '../style/theme';
import LargeProfile from '../components/organisms/LargeProfileBox';
import NewProfileBox from '../components/organisms/NewProfileBox';
import PageHeaderText from '../components/atoms/PageHeaderText';
import DeleteText from '../components/atoms/DeleteText';
import LargeNewProfileBtn from '../components/atoms/LargeNewProfileBtn';

const ProfilesPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.mainSkyblue};
  padding: 80px;
`;

const ProfilesContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 420px;
  margin-top: 50px;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
`;

function FamilyProfilePage() {
  const [textInputValue, setTextInputValue] = useState<string>('');
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useRecoilState(UserProfileState);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfiles() {
      try {
        const response = await getProfiles();
        setProfiles(response.content.profileList);
      } catch (error) {
        console.log(error);
      }
    }
    if (isCreating !== true) {
      loadProfiles();
      console.log('로딩');
    }
  }, [isCreating]);

  const handleSelectProfile = (
    Id: number,
    Char: string,
    Img: string,
    Name: string,
  ) => {
    setUserProfile({
      profileId: Id,
      character: Char,
      profileImg: Img,
      nickname: Name,
    });
    navigate('/menu');
  };
  const handleCreateProfile = async () => {
    try {
      const response = await newProfile(textInputValue);
      setTextInputValue('');
      setIsCreating(false);
    } catch (error) {
      console.log('프로필 생성 실패: ', error);
    }
  };

  // 조건에 따라 content 분기 처리
  // 1차 분기 - 새 프로필을 생성 중인지 아닌지
  // 2차 분기 - 현재 프로필의 길이가 4(3)인지 그 이하인지
  let content;
  if (isCreating) {
    content =
      profiles.length < 3 ? (
        <ProfilesContainer>
          {profiles.map((profile) => (
            <LargeProfile
              key={profile.id}
              ProfileCharacter={
                profile.profileAvatar.myAvatarItem.item.avatarResponse
                  .avatarName
              }
              ProfileImage={
                profile.profileAvatar.myAvatarItem.item.avatarResponse
                  .avatarImage
              }
              ProfileName={profile.profileName}
              onClick={() => {
                alert('프로필 생성중에는 선택할 수 없어요');
              }}
            />
          ))}
          <NewProfileBox
            inputValue={textInputValue}
            onTextInputChange={setTextInputValue}
            onClick={() => {
              console.log(textInputValue);
              handleCreateProfile();
              // newProfile(textInputValue);
              // setTextInputValue('');
            }}
          />
          <LargeNewProfileBtn
            onClick={() => {
              alert('프로필 생성중에는 선택할 수 없어요');
            }}
          />
        </ProfilesContainer>
      ) : (
        <ProfilesContainer>
          {profiles.map((profile) => (
            <LargeProfile
              key={profile.id}
              ProfileCharacter={
                profile.profileAvatar.myAvatarItem.item.avatarResponse
                  .avatarName
              }
              ProfileImage={
                profile.profileAvatar.myAvatarItem.item.avatarResponse
                  .avatarImage
              }
              ProfileName={profile.profileName}
              onClick={() => {
                alert('프로필 생성중에는 선택할 수 없어요');
              }}
            />
          ))}
          <NewProfileBox
            inputValue={textInputValue}
            onTextInputChange={setTextInputValue}
            onClick={() => {
              handleCreateProfile();
            }}
          />
        </ProfilesContainer>
      );
  } else {
    content =
      profiles.length < 4 ? (
        <ProfilesContainer>
          {profiles.map((profile) => (
            <LargeProfile
              key={profile.id}
              ProfileCharacter={
                profile.profileAvatar.myAvatarItem.item.avatarResponse
                  .avatarName
              }
              ProfileImage={
                profile.profileAvatar.myAvatarItem.item.avatarResponse
                  .avatarImage
              }
              ProfileName={profile.profileName}
              onClick={() => {
                handleSelectProfile(
                  profile.id,
                  profile.profileAvatar.myAvatarItem.item.avatarResponse
                    .avatarName,
                  profile.profileAvatar.myAvatarItem.item.avatarResponse
                    .avatarImage,
                  profile.profileName,
                );
              }}
            />
          ))}
          <LargeNewProfileBtn
            onClick={() => {
              setIsCreating(true);
            }}
          />
        </ProfilesContainer>
      ) : (
        <ProfilesContainer>
          {profiles.map((profile) => (
            <LargeProfile
              key={profile.id}
              ProfileCharacter={
                profile.profileAvatar.myAvatarItem.item.avatarResponse
                  .avatarName
              }
              ProfileImage={
                profile.profileAvatar.myAvatarItem.item.avatarResponse
                  .avatarImage
              }
              ProfileName={profile.profileName}
              onClick={() => {
                handleSelectProfile(
                  profile.id,
                  profile.profileAvatar.myAvatarItem.item.avatarResponse
                    .avatarName,
                  profile.profileAvatar.myAvatarItem.item.avatarResponse
                    .avatarImage,
                  profile.profileName,
                );
              }}
            />
          ))}
        </ProfilesContainer>
      );
  }
  return (
    <ProfilesPageContainer>
      <PageHeaderText
        content="프로필을 선택해주세요"
        color="dark"
        fontSize="90px"
      />
      {content}
      <DeleteText
        content="탈퇴하기"
        onClick={() => {
          if (isCreating) {
            alert('프로필 생성 중에는 탈퇴할 수 없어요');
          } else {
            deleteUser();
            console.log('탈퇴');
            navigate('/');
          }
        }}
      />
    </ProfilesPageContainer>
  );
}

export default FamilyProfilePage;
