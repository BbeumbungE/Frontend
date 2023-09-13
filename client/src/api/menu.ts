import { AxiosResponse } from 'axios';
import { useRecoilState } from 'recoil';
import { api } from './api';
import { UserProfileState } from '../recoil/profile/atom';

const [userProfile, setUserProfile] = useRecoilState(UserProfileState);

// 유저가 보유한 그림주제 가져오는 메서드
const getUserTopic = async (page: number): Promise<AxiosResponse> => {
  try {
    const { profileId }: { profileId: number } = userProfile;
    const response: AxiosResponse = await api.get(
      `/api/profiles/${profileId}/my-items?category=subject&page=${page}&size=4`,
    );
    return response;
  } catch (error) {
    console.log('유저 보유 그림주제 조회 실패', error);
    throw error;
  }
};

export { getUserTopic };
