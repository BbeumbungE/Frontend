import { AxiosResponse } from 'axios';
import { api } from './api';

interface SketchList {
  sketchId: number;
  sketchImageUrl: string;
}

interface RecordData {
  id: number;
  score: string;
}

interface ApiResponse {
  id: number;
  itemPrice: number;
  hasItem: boolean;
  timeLimit: number;
  subject: {
    id: number;
    subjectName: string;
    subjectImage: string;
    sketchList: SketchList[];
  };
  record: RecordData | null;
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

interface Sketch {
  sketchId: number;
  sketchImageUrl: string;
}

interface SubjectItem {
  id: number;
  subjectName: string;
  subjectImage: string;
  sketchList: Sketch[];
}

interface Record {
  id: number;
  score: number;
}

interface LevelDetailResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    id: number;
    stageNum: number;
    timeLimit: number;
    subjectItem: SubjectItem;
    record: Record;
  };
}

interface PointInfo {
  previousPoint: number;
  currentPoint: number;
  rewardPoint: number;
}

interface Content {
  id: number;
  score: number;
  pointInfo: PointInfo;
}

interface Status {
  httpStatus: string;
  code: number;
  message: string;
}

interface FirstFinishResponse {
  status: Status;
  content: Content;
}

interface Status {
  httpStatus: string;
  code: number;
  message: string;
}

interface Content {
  previousPoint: number;
  currentPoint: number;
  rewardPoint: number;
}

interface SecondFinishResponse {
  status: Status;
  content: Content;
}

const getLevelDetail = async (
  profileId: number,
  stageId: number,
): Promise<LevelDetailResponse> => {
  try {
    const response: AxiosResponse<LevelDetailResponse> = await api.get(
      `/api/profiles/${profileId}/stages/${stageId}`,
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
  profileId: number,
  canvasId: number,
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

const postFirstFinishedDrawing = async (
  profileId: number,
  stageId: number,
  canvasId: number,
): Promise<FirstFinishResponse> => {
  try {
    const jsonData = { canvasId };
    const response = await api.post(
      `/api/profiles/${profileId}/stages/${stageId}/records
      `,
      jsonData,
    );
    return response.data;
  } catch (error) {
    console.log('첫번째 기록 갱신 실패', error);
    throw error;
  }
};

const patchFinishedDrawing = async (
  profileId: number,
  stageId: number,
  recordId: number,
  canvasId: number,
): Promise<SecondFinishResponse> => {
  try {
    const jsonData = { canvasId };
    const response = await api.patch(
      `/api/profiles/${profileId}/stages/${stageId}/records/${recordId}
      `,
      jsonData,
    );
    return response.data;
  } catch (error) {
    console.log('두번째 이후 기록 갱신 실패', error);
    throw error;
  }
};

const getTopDrawing = async (
  subjectId: number,
): Promise<PostDrawingResponse> => {
  try {
    const response = await api.get(
      `/api/subjects/${subjectId}/posts/top
      `,
    );
    return response.data;
  } catch (error) {
    console.log('인기 작품 조회 실패', error);
    throw error;
  }
};

export {
  getLevelDetail,
  postDrawing,
  patchDrawing,
  postFirstFinishedDrawing,
  patchFinishedDrawing,
  getTopDrawing,
};
