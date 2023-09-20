import { AxiosResponse } from 'axios';
import { api } from './api';

interface Notification {
  id: number;
  content: string;
  type: string;
  receiver: string;
  createAt: string;
  read: boolean;
}

interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface AlarmsResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    data: Notification[];
    pageInfo: PageInfo;
  };
}

const getAlarms = async (
  profileId: number,
  pageNum: number,
): Promise<AlarmsResponse> => {
  try {
    const response: AxiosResponse<AlarmsResponse> = await api.get(
      `/api/profiles/${profileId}/notifications?page=${pageNum}&size=5`,
    );
    return response.data;
  } catch (error) {
    console.log('프로필 알림 조회 실패', error);
    throw error;
  }
};

export { getAlarms };
