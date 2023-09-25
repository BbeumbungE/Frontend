import { AxiosResponse } from 'axios';
import { api } from './api';

interface Sketch {
  sketchId: number;
  sketchImageUrl: string;
}

interface Subject {
  id: number;
  subjectName: string;
  subjectImage: string;
  sketchList: Sketch[];
}

interface SubjectItem {
  id: number;
  itemPrice: number;
  hasItem: boolean;
  subject: Subject;
}

interface Record {
  id: number;
  stageNum: number;
  subjectItem: SubjectItem;
  record: null;
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
    data: {
      highestClearedStageNumber: number;
      record: Record[];
    };
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
      `/api/profiles/${profileId}/stages?page=${page}&size=${itemsPerPage}&sort=stageNum`,
    );
    return response.data;
  } catch (error) {
    console.log('유저 레벨 조회 실패', error);
    throw error;
  }
};

export { getUserLevel };
