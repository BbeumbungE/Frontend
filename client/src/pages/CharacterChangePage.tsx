import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';
import theme from '../style/theme';
import { getMyAvatar } from '../api/item';
import { UserProfileState } from '../recoil/profile/atom';
import ExitBox from '../components/organisms/ExitBox';
import UserRupee from '../components/atoms/UserRupee';
import CharacterBackground from '../components/organisms/CharacterBackground';
import { updateAvatar } from '../api/profiles';

interface Avatar {
  id: number;
  avatarName: string;
  avatarImage: string;
}

interface AvatarData {
  id: number;
  itemPrice: number;
  hasItem: boolean;
  avatarResponse: Avatar;
}

interface AvatarResponse {
  id: number;
  avatarName: string;
  avatarImage: string;
}

interface Item {
  id: number;
  itemPrice: number;
  hasItem: boolean;
  avatarResponse: AvatarResponse;
}

interface MyItem {
  id: number;
  itemType: string;
  item: Item;
}

interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

function CharacterChangePage() {
  const [userProfile, setUserProfile] = useRecoilState(UserProfileState);
  const [avatars, setAvatars] = useState<MyItem[]>();
  const currentPage = 0;

  useEffect(() => {
    async function fetchAvatars() {
      // 비동기 함수로 감싸서 사용
      try {
        const response = await getMyAvatar(userProfile.profileId);
        console.log('응답', response);
        setAvatars(response.content.data);
      } catch (error) {
        console.log('보유 아바타 가져오기 실패', error);
      }
    }

    fetchAvatars();
  }, [currentPage, userProfile.profileId]);

  const handleUpdate = async (
    profileId: number,
    profileItemId: number,
    myItemId: number,
  ): Promise<void> => {
    try {
      const body = {
        myItemId,
      };
      const response = await updateAvatar(profileId, profileItemId, body);
      console.log('아바타 변경 성공', response);
    } catch (error) {
      console.error('아바타 변경 실패', error);
    }
  };

  console.log('보유 아바타', avatars);

  const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
    position: fixed;
    overflow: hidden;
  `;

  const CharacterImage = styled.div<{ $bgImage: string | null }>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 22rem;
    height: 22rem;
    background-image: url(${(props) => props.$bgImage});
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 200;
  `;

  const Nickname = styled.span`
    text-align: center;
    color: ${(props) => props.theme.colors.mainBlack};
    font-size: 50px;
    font-weight: 400;
    line-height: normal;
    z-index: 200;
    position: absolute;
    top: 22%;
    left: 51%;
    transform: translate(-50%, -50%);
  `;

  const AvatarWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 40px;
    margin-top: 20px;
    z-index: 300;
  `;

  const AvatarCircle = styled.div<{
    $bgImage: string;
    $avatarName: string;
    onClick: () => void;
  }>`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-image: url(${(props) => props.$bgImage});
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;

    ${(props) => {
      // 동적으로 배경색 변경
      let mountainColor;
      switch (props.$avatarName) {
        case 'hamster':
          mountainColor = theme.hamsterColors.mountain;
          break;
        case 'otter':
          mountainColor = theme.otterColors.mountain;
          break;
        case 'fox':
          mountainColor = theme.foxColors.mountain;
          break;
        case 'eagle':
          mountainColor = theme.eagleColors.mountain;
          break;
        case 'crocodile':
          mountainColor = theme.crocodileColors.mountain;
          break;
        case 'unicorn':
          mountainColor = theme.unicornColors.mountain1;
          break;
        case 'lion':
          mountainColor = theme.lionColors.mountain;
          break;
        default:
          mountainColor = theme.hamsterColors.mountain;
      }
      return `background-color: ${mountainColor};`;
    }}
  `;

  return (
    <Wrapper>
      <ExitBox color="dark" />
      <UserRupee />
      <Nickname>{userProfile.nickname}</Nickname>
      <CharacterImage $bgImage={userProfile.profileImg} />
      <AvatarWrapper>
        {avatars &&
          avatars.map((avatar) => {
            if (
              avatar.item.avatarResponse.avatarName !== userProfile.character &&
              avatar.item.hasItem
            ) {
              return (
                <AvatarCircle
                  key={avatar.id}
                  $bgImage={avatar.item.avatarResponse.avatarImage}
                  $avatarName={avatar.item.avatarResponse.avatarName}
                  onClick={() =>
                    Swal.fire({
                      title: '캐릭터를 변경할까요?',
                      showDenyButton: true,
                      denyButtonText: '아니요',
                      denyButtonColor: `${theme.colors.mainGray}`,
                      confirmButtonColor: `${theme.colors.mainBlue}`,
                      confirmButtonText: '네',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleUpdate(
                          userProfile.profileId,
                          userProfile.profileItemId,
                          avatar.id,
                        );
                        setUserProfile((prevState) => ({
                          ...prevState,
                          profileImg: avatar.item.avatarResponse.avatarImage,
                          character: avatar.item.avatarResponse.avatarName,
                        }));
                      }
                    })
                  }
                />
              );
            }
            return null;
          })}
      </AvatarWrapper>
      <CharacterBackground />
    </Wrapper>
  );
}

export default CharacterChangePage;
