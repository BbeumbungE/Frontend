import { AxiosResponse } from 'axios';
import { api } from './api';

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

export { deleteUser };
