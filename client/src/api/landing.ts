import { AxiosResponse } from 'axios';
import { api } from './api';

interface TempIdResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    subjectId: number;
    subjectSketch: string;
    tempId: string;
  };
}

interface DrawingResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: null;
}

interface PostData {
  subjectId: number;
}

const postTempId = async (postData: PostData): Promise<TempIdResponse> => {
  try {
    const response = await api.post(`/api/tempId`, postData);
    return response.data;
  } catch (error) {
    console.log('임시아이디 발급 에러', error);
    throw error;
  }
};

const postDrawing = async (
  subjectId: number,
  tempId: string,
  formData: FormData,
): Promise<DrawingResponse> => {
  try {
    const response = await api.post(
      `api/canvases/demo/subject/${subjectId}/tempId/${tempId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('랜딩 페이지 변환하기 실패', error);
    throw error;
  }
};

export { postTempId, postDrawing };
