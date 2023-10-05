import { AxiosResponse } from 'axios';
import { api } from './api';

interface Status {
  httpStatus: string;
  code: number;
  message: string;
}

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

interface DetailContent {
  id: number;
  itemPrice: number;
  hasItem: boolean;
  subject: Subject;
}

interface ApiResponse {
  status: Status;
  content: DetailContent;
}

const getTopicDrawings = async (itemId: number): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/api/items/${itemId}/subjects`);
    return response.data;
  } catch (error) {
    console.log('그림 주제 상세조회 에러', error);
    throw error;
  }
};

const postTopicDrawing = async (canvasId: number): Promise<any> => {
  try {
    const response = await api.post(`/api/canvases/${canvasId}/posts`);
    return response.data;
  } catch (error) {
    console.log('그림 게시물 생성 에러', error);
    throw error;
  }
};

export { getTopicDrawings, postTopicDrawing };
