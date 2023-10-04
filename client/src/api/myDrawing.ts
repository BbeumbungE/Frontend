import { AxiosResponse } from 'axios';
import { api } from './api';

interface Status {
  httpStatus: string;
  code: number;
  message: string;
}

interface Data {
  canvasId: number;
  imageUrl: string;
}

interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface DrawingResponse {
  status: Status;
  content: {
    data: Data[];
    pageInfo: PageInfo;
  };
}

interface Content {
  canvasId: number;
  canvasUrl: string;
  sketchUrl: string;
  subjectName: string;
}

interface DetailResponse {
  status: Status;
  content: Content;
}

const getMyDrawing = async (
  profileId: number,
  page: number,
  size: number,
): Promise<DrawingResponse> => {
  try {
    const response = await api.get(
      `/api/profiles/${profileId}/canvases?page=${page}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    console.log('내 그림 가져오기 에러', error);
    throw error;
  }
};

const deleteDrawing = async (profileId: number, canvasId: number) => {
  try {
    const response = await api.delete(
      `/api/profiles/${profileId}/canvases/${canvasId}`,
    );
    return response.status;
  } catch (error) {
    console.log('그림 삭제 실패', error);
    throw error;
  }
};

const getDrawingDetail = async (
  profileId: number,
  canvasId: number,
): Promise<DetailResponse> => {
  try {
    const response = await api.get(
      `/api/profiles/${profileId}/canvases/${canvasId}`,
    );
    return response.data;
  } catch (error) {
    console.log('그림 조회 실패', error);
    throw error;
  }
};

export { getMyDrawing, deleteDrawing, getDrawingDetail };
