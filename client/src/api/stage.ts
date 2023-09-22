import { AxiosResponse } from 'axios';
import { api } from './api';

interface Record {
  id: number;
  score: number;
}

interface Subject {
  id: number;
  subjectName: string;
  subjectImage: string;
  sketch: string;
}

interface SubjectItem {
  id: number;
  itemPrice: number;
  hasItem: boolean;
  subject: Subject;
}

interface Stage {
  id: number;
  stageNum: number;
  point: number;
  subjectItem: SubjectItem;
  record: Record | null;
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

const getUserLevel = async (
  page: number,
  profileId: number,
  itemsPerPage: number,
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await api.get(
      `/api/profiles/${profileId}/stages/records?page=${page}&size=${itemsPerPage}&sort=stageNum`,
    );
    return response.data;
  } catch (error) {
    console.log('유저 레벨 조회 실패', error);
    throw error;
  }
};

export { getUserLevel };
