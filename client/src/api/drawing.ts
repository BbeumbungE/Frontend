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

const getLevelDetail = async (
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

const postDrawing = async (
  profileId: number,
  subjectId: number,
  formData: FormData,
) => {
  try {
    const response = await api.post(
      `/api/canvases?profileId=${profileId}&subjectId=${subjectId}`,
      formData,
    );
    return response;
  } catch (error) {
    console.log('첫 변환하기 실패', error);
    throw error;
  }
};

const patchDrawing = async (canvasId: number, profileId: number) => {
  try {
    const response = await api.patch(
      `/api/canvases/${canvasId}?profileId=${profileId}`,
    );
    return response;
  } catch (error) {
    console.log('두번째 이후 변환하기 실패', error);
    throw error;
  }
};

export { getLevelDetail, postDrawing, patchDrawing };
