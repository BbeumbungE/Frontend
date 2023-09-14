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

export { getProfiles, newProfile };
