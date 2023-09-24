import { AxiosResponse } from 'axios';
import { api } from './api';

interface SketchList {
  sketchId: number;
  sketchImageUrl: string;
}

interface ApiResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    id: number;
    stageNum: number;
    point: number;
    timeLimit: number;
    subject: {
      id: number;
      subjectName: string;
      subjectImage: string;
      sketchList: SketchList[];
    };
  };
}

interface PostDrawingResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    canvasId: number;
    topPost: string;
  };
}

const getLevelDetail = async (stageId: number): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await api.get(
      `/api/stages/${stageId}`,
    );
    return response.data;
  } catch (error) {
    console.log('개별 스테이지 조회(그리기 시작)', error);
    throw error;
  }
};

const postDrawing = async (
  profileId: number,
  subjectId: number,
  formData: FormData,
): Promise<PostDrawingResponse> => {
  try {
    const response = await api.post(
      `/api/canvases?profileId=${profileId}&subjectId=${subjectId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
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
