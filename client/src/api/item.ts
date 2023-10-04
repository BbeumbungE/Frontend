import { AxiosResponse } from 'axios';
import { api } from './api';

interface Subject {
  id: number;
  subjectName: string;
  subjectImage: string;
}

interface Avatar {
  id: number;
  avatarName: string;
  avatarImage: string;
}

interface AvatarData {
  id: number;
  itemPrice: number;
  hasItem: boolean;
  avatarResponse: Avatar;
}
interface TitleData {
  id: number;
  itemPrice: number;
  hasItem: boolean;
  subject: Subject;
}

interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface TitleResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    data: TitleData[];
    pageInfo: PageInfo;
  };
}
interface AvatarResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    data: AvatarData[];
    pageInfo: PageInfo;
  };
}

interface AvatarResponse {
  id: number;
  avatarName: string;
  avatarImage: string;
}

interface Item {
  id: number;
  itemPrice: number;
  hasItem: boolean;
  avatarResponse: AvatarResponse;
}

interface MyItem {
  id: number;
  itemType: string;
  item: Item;
}

interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface MyItemResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    data: MyItem[];
    pageInfo: PageInfo;
  };
}

const getAvatars = async (
  profileId: number,
  pageNum: number,
): Promise<AvatarResponse> => {
  try {
    const response: AxiosResponse<AvatarResponse> = await api.get(
      `/api/profiles/${profileId}/items/avatars?page=${pageNum}&size=8`,
    );
    return response.data;
  } catch (error) {
    console.log('해당 프로필 상점 아바타 조회 실패', error);
    throw error;
  }
};

const getPictureTitles = async (
  profileId: number,
  pageNum: number,
): Promise<TitleResponse> => {
  try {
    const response: AxiosResponse<TitleResponse> = await api.get(
      `/api/profiles/${profileId}/items/subjects?page=${pageNum}&size=8`,
    );
    return response.data;
  } catch (error) {
    console.log('해당 프로필 상점 그림주제 조회 실패', error);
    throw error;
  }
};

const buyItem = async (
  profileId: number,
  itemId: number,
  category: string,
): Promise<AxiosResponse> => {
  try {
    const response = await api.post(
      `/api/profiles/${profileId}/items/${itemId}/?category=${category}`,
    );
    return response;
  } catch (error) {
    console.log('아이템 구매 실패', error);
    throw error;
  }
};

const getMyAvatar = async (profileId: number): Promise<MyItemResponse> => {
  try {
    const response = await api.get(
      `/api/profiles/${profileId}/my-items?category=avatar&page=0&size=8`,
    );
    return response.data;
  } catch (error) {
    console.log('내 아바타 조회 실패', error);
    throw error;
  }
};

export { getAvatars, getPictureTitles, buyItem, getMyAvatar };
