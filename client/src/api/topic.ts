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

const getTopicDrawings = async (itemId: number): Promise<TempIdResponse> => {
  try {
    const response = await api.get(`/api/items/${itemId}/subjects`);
    return response.data;
  } catch (error) {
    console.log('그림 주제 상세조회 에러', error);
    throw error;
  }
};

const postTopicDrawing = async (canvasId: number): Promise<TempIdResponse> => {
  try {
    const response = await api.post(`/api/canvases/${canvasId}/posts`);
    return response.data;
  } catch (error) {
    console.log('그림 게시물 생성 에러', error);
    throw error;
  }
};

export { getTopicDrawings, postTopicDrawing };
