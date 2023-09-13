import { AxiosResponse } from 'axios';
import { api } from './api';
// 유저의 모든 프로필을 가져오는 메서드
const getProfiles = async (): Promise<AxiosResponse> => {
  try {
    const response = await api.get(`/api/members/profiles`);
    return response.data.content;
  } catch (error) {
    console.log('보유 프로필 조회 실패', error);
    throw error;
  }
};

const newProfile = async (
  name: string,
  img: string,
): Promise<AxiosResponse> => {
  try {
    const requestData = {
      profileName: name,
      profileImage: img,
    };
    const response = await api.post(`/api/profiles`, requestData);
    return response;
  } catch (error) {
    console.log('프로필 생성 실패', error);
    throw error;
  }
};

export { getProfiles, newProfile };
