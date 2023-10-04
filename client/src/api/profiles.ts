import { AxiosResponse } from 'axios';
import { api } from './api';

interface ProfilesResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    profileList: {
      id: number;
      member: {
        userId: string;
        email: string;
      };
      profileName: string;
      profileAvatar: {
        id: number;
        myAvatarItem: {
          id: number;
          item: {
            avatarResponse: {
              avatarImage: string;
              avatarName: string;
              id: number;
            };
            hasItem: boolean;
            id: number;
            itemPrice: number;
          };
          itemType: string;
        };
      };
    }[];
  };
}

// 유저의 모든 프로필을 가져오는 메서드
const getProfiles = async (): Promise<ProfilesResponse> => {
  try {
    const response: AxiosResponse<ProfilesResponse> = await api.get(
      `/api/members/profiles`,
    );
    return response.data;
  } catch (error) {
    console.log('보유 프로필 조회 실패', error);
    throw error;
  }
};

// 새 프로필을 만드는 메서드
const newProfile = async (name: string): Promise<AxiosResponse> => {
  try {
    const requestData = {
      profileName: name,
    };
    const response = await api.post(`/api/profiles`, requestData);
    return response;
  } catch (error) {
    console.log('프로필 생성 실패', error);
    throw error;
  }
};

// 프로필을 삭제하는 메서드
const deleteProfile = async (profileId: number): Promise<AxiosResponse> => {
  try {
    const response = await api.delete(`/api/profiles/${profileId}`);
    return response;
  } catch (error) {
    console.log('프로필 삭제 실패', error);
    throw error;
  }
};

// 닉네임 교체 메서드
const newNickname = async (
  profileId: number,
  name: string,
): Promise<AxiosResponse> => {
  try {
    const patchData = {
      profileName: name,
    };
    const response = await api.patch(
      `/api/profiles/${profileId}/names`,
      patchData,
    );
    return response;
  } catch (error) {
    console.log('닉네임 변경 실패', error);
    throw error;
  }
};

const updateAvatar = async (
  profileId: number,
  profileItemId: number,
  body: { myItemId: number },
) => {
  try {
    const response = await api.patch(
      `/api/profiles/${profileId}/profile-items/${profileItemId}`,
      body,
    );
    return response.data;
  } catch (error) {
    console.log('아바타 변경 실패', error);
    throw error;
  }
};

export { getProfiles, newProfile, deleteProfile, newNickname, updateAvatar };
