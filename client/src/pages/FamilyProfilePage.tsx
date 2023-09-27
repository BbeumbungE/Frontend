import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { UserProfileState } from '../recoil/profile/atom';
import { UserRupeeState } from '../recoil/rupee/atom';
import { sseMessageState } from '../recoil/mainalarm/atom';
import { getProfiles, newProfile } from '../api/profiles';
import { deleteUser } from '../api/user';
import { getRupee } from '../api/rupee';
import theme from '../style/theme';
import LargeProfile from '../components/organisms/LargeProfileBox';
import NewProfileBox from '../components/organisms/NewProfileBox';
import ExitBox from '../components/organisms/ExitBoxOnBlur';
import PageHeaderText from '../components/atoms/PageHeaderText';
import DeleteText from '../components/atoms/DeleteText';
import LargeNewProfileBtn from '../components/atoms/LargeNewProfileBtn';
import { connectEventSSE, disconnectEventSSE } from '../sse/mainSSE';

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

const ExitBoxWrapper = styled.div`
  position: fixed;
  top: 3%;
  left: 0%;
`;

function FamilyProfilePage() {
  const [textInputValue, setTextInputValue] = useState<string>('');
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useRecoilState(UserProfileState);
  const [userRupee, setUserRupee] = useRecoilState(UserRupeeState);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfiles() {
      try {
        const response = await getProfiles();
        setProfiles(response.content.profileList);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    if (isCreating !== true) {
      loadProfiles();
      console.log('로딩');
    }
  }, [isCreating]);

  const handleSelectProfile = async (
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
    const response = await getRupee(Id);
    console.log(response);
    console.log(response.content.point);
    const rupeeValue = Number(response.content.point);
    await setUserRupee({
      rupee: rupeeValue,
    });
    connectEventSSE(userProfile.profileId);
    console.log(userRupee);
    navigate('/menu');
  };
  const handleCreateProfile = async () => {
    try {
      const response = await newProfile(textInputValue);
      setTextInputValue('');
      setIsCreating(false);
    } catch (error: any) {
      console.log('프로필 생성 실패: ', error);
      switch (error.response?.data.code) {
        case 'P002':
          Swal.fire({
            title: '적절하지 않은 닉네임이에요.',
            width: '600px',
          });
          break;
        case 'P001':
          Swal.fire({
            title: '다른 프로필과 중복되는 닉네임이에요.',
            width: '600px',
          });
          break;
        default:
          Swal.fire({
            title: '다시 로그인 후 시도해주세요.',
            width: '600px',
          });
      }
    }
  };

  // 조건에 따라 content 분기 처리
  // 1차 분기 - 새 프로필을 생성 중인지 아닌지
  // 2차 분기 - 현재 프로필의 길이가 4(3)인지 그 이하인지
  let content;
  if (isCreating) {
    content =
      profiles.length < 3 ? (
        <>
          <ExitBoxWrapper>
            <ExitBox onClick={() => setIsCreating(false)} color="dark" />
          </ExitBoxWrapper>
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
                  Swal.fire({
                    title: '프로필 생성중에는 선택할 수 없어요',
                    width: '600px',
                  });
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
                Swal.fire({
                  title: '프로필 생성중에는 선택할 수 없어요',
                  width: '600px',
                });
              }}
            />
          </ProfilesContainer>
        </>
      ) : (
        <>
          <ExitBoxWrapper>
            <ExitBox onClick={() => setIsCreating(false)} color="dark" />
          </ExitBoxWrapper>
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
                  Swal.fire({
                    title: '프로필 생성중에는 선택할 수 없어요',
                    width: '600px',
                  });
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
        </>
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
            Swal.fire({
              title: '프로필 생성중에는 선택할 수 없어요',
              width: '600px',
            });
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
