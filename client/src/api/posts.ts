import { AxiosResponse } from 'axios';
import { api } from './api';

interface RankingResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    time: string;
    subjectName: string;
    rankerList: {
      profileId: number;
      canvasId: number;
      postId: number;
      canvasUrl: string;
    }[];
  };
}

interface PostResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    subjectId: number;
    subjectName: string;
    subjectImage: string;
    postLists: {
      postId: number;
      canvasUrl: string;
    }[];
    currentPage: number;
    totalPages: number;
  };
}

interface PostDetailResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    canvasUrl: string;
    authorProfileId: number;
    authorProfileImage: string;
    postEmotionTypeInfos: {
      emotionTypeId: number;
      emotionTypeName: string;
      emotionCount: number;
      emoted: boolean;
    }[];
  };
}
// 랭킹 게시물 조회 메서드
const getRankPosts = async (subjectId: number): Promise<RankingResponse> => {
  try {
    const response: AxiosResponse<RankingResponse> = await api.get(
      `/api/subjects/${subjectId}/posts/ranking`,
    );
    return response.data;
  } catch (error) {
    console.log('랭킹 조회 실패', error);
    throw error;
  }
};
// 임시 구현, 나중에 다시 보기
const getPosts = async (
  subjectId: number,
  curPage: number,
): Promise<PostResponse> => {
  try {
    const response: AxiosResponse<PostResponse> = await api.get(
      `/api/subjects/${subjectId}/posts?page=${curPage}&size=8`,
    );
    return response.data;
  } catch (error) {
    console.log('게시물 조회 실패', error);
    throw error;
  }
};

const getDetail = async (
  postId: number,
  profileId: number,
): Promise<PostDetailResponse> => {
  try {
    const response: AxiosResponse<PostDetailResponse> = await api.get(
      `/api/posts/${postId}/?profileId=${profileId}`,
    );
    return response.data;
  } catch (error) {
    console.log('상세 조회 실패', error);
    throw error;
  }
};

const makeEmotion = async (
  postId: number,
  profileId: number,
  emotionTypeId: number,
): Promise<AxiosResponse> => {
  try {
    const response = await api.post(
      `/api/posts/${postId}/profiles/${profileId}/emotions/?emotionTypeId=${emotionTypeId}`,
    );
    return response;
  } catch (error) {
    console.log('감정표현 실패', error);
    throw error;
  }
};
const updateEmotion = async (
  postId: number,
  profileId: number,
  emotionTypeId: number,
): Promise<AxiosResponse> => {
  try {
    const response = await api.patch(
      `/api/posts/${postId}/profiles/${profileId}/emotions/?emotionTypeId=${emotionTypeId}`,
    );
    return response;
  } catch (error) {
    console.log('감정표현 실패', error);
    throw error;
  }
};

const deleteEmotion = async (
  postId: number,
  profileId: number,
): Promise<AxiosResponse> => {
  try {
    const response = await api.delete(
      `/api/posts/${postId}/profiles/${profileId}/emotions`,
    );
    return response;
  } catch (error) {
    console.log('감정표현 삭제 실패', error);
    throw error;
  }
};

export {
  getRankPosts,
  getPosts,
  getDetail,
  makeEmotion,
  updateEmotion,
  deleteEmotion,
};
