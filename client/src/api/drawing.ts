import { AxiosResponse } from 'axios';
import { api } from './api';

interface SketchList {
  sketchId: number;
  sketchImageUrl: string;
}

interface levelDetailResponse {
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

const getLevelDetail = async (
  stageId: number,
): Promise<levelDetailResponse> => {
  try {
    const response: AxiosResponse<levelDetailResponse> = await api.get(
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
    console.log('첫번째 변환하기 실패', error);
    throw error;
  }
};

const patchDrawing = async (
  canvasId: number,
  profileId: number,
  formData: FormData,
): Promise<PostDrawingResponse> => {
  try {
    const response = await api.patch(
      `/api/canvases/${canvasId}?profileId=${profileId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('두번째 이후 변환하기 실패', error);
    throw error;
  }
};

const postFirstFinishedDrawing = async (profileId: number, stageId: number) => {
  try {
    const response = await api.post(
      `profiles/${profileId}/stages/${stageId}/records
      `,
    );
    return response;
  } catch (error) {
    console.log('첫번째 기록 갱신 실패', error);
    throw error;
  }
};

const patchFinishedDrawing = async (
  profileId: number,
  stageId: number,
  recordId: number,
) => {
  try {
    const response = await api.post(
      `profiles/${profileId}/stages/${stageId}/records/${recordId}
      `,
    );
    return response;
  } catch (error) {
    console.log('두번째 이후 기록 갱신 실패', error);
    throw error;
  }
};

export {
  getLevelDetail,
  postDrawing,
  patchDrawing,
  postFirstFinishedDrawing,
  patchFinishedDrawing,
};
