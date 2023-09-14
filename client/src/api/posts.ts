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
    rankerList: {
      canvasId: number;
      postId: number;
      canvasUrl: string;
    }[];
  };
}
// 임시 구현, 나중에 다시 보기
interface PostResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    postList: {
      id: number;
    }[];
  };
}
// 랭킹 게시물 조회 메서드
const getRankPosts = async (): Promise<RankingResponse> => {
  try {
    const response: AxiosResponse<RankingResponse> =
      await api.get(`/api/posts/ranking`);
    return response.data;
  } catch (error) {
    console.log('랭킹 조회 실패', error);
    throw error;
  }
};
// 임시 구현, 나중에 다시 보기
const getPosts = async (subjectId: number): Promise<PostResponse> => {
  try {
    const response: AxiosResponse<PostResponse> = await api.get(
      `/api/subjects/${subjectId}/posts`,
    );
    return response.data;
  } catch (error) {
    console.log('게시물 조회 실패', error);
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

export { getRankPosts, getPosts, makeEmotion, deleteEmotion };
