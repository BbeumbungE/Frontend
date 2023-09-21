import { AxiosResponse } from 'axios';
import { api } from './api';

// 로그아웃 메서드
const logoutUser = async (): Promise<AxiosResponse> => {
  try {
    const response = await api.get(`/logout`);
    return response;
  } catch (error) {
    console.log('로그아웃 실패', error);
    throw error;
  }
};
// 회원 탈퇴 메서드
const deleteUser = async (): Promise<AxiosResponse> => {
  try {
    const response = await api.delete(`/api/members`);
    return response;
  } catch (error) {
    console.log('탈퇴 실패', error);
    throw error;
  }
};

export { logoutUser, deleteUser };
