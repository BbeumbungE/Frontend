import { AxiosResponse } from 'axios';
import { api } from './api';

interface TopicData {
  id: number;
  sketch: string;
  subjectImage: string;
  subjectName: string;
}

interface SubjectItem {
  subject: TopicData[];
  id: number;
  itemType: string;
  item: {
    id: number;
    itemPrice: number;
    hasItem: boolean;
    subject: {
      id: number;
      subjectName: string;
      subjectImage: string;
    };
  };
}

interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface ApiResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    data: SubjectItem[];
    pageInfo: PageInfo;
  };
}

const getUserTopic = async (
  page: number,
  profileId: number,
  itemsPerPage: number,
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await api.get(
      `/api/profiles/${profileId}/my-items?category=subject&page=${page}&size=${itemsPerPage}`,
    );
    return response.data;
  } catch (error) {
    console.log('유저 보유 그림주제 조회 실패', error);
    throw error;
  }
};

const getTotalTopic = async (
  page: number,
  profileId: number,
  itemsPerPage: number,
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await api.get(
      `/api/profiles/${profileId}/items/subjects?page=${page}&size=${itemsPerPage}`,
    );
    return response.data;
  } catch (error) {
    console.log('전체 그림주제 조회 실패', error);
    throw error;
  }
};

export { getUserTopic, getTotalTopic };
