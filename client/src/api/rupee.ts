import { AxiosResponse } from 'axios';
import { api } from './api';

interface RupeeResponse {
  status: {
    httpStatus: string;
    code: number;
    message: string;
  };
  content: {
    id: number;
    point: number;
  };
}

const getRupee = async (profileId: number): Promise<RupeeResponse> => {
  try {
    const response: AxiosResponse<RupeeResponse> = await api.get(
      `/api/profiles/${profileId}/points`,
    );
    return response.data;
  } catch (error) {
    console.log('Rupee 조회 실패', error);
    throw error;
  }
};

const patchRupee = async (
  profileId: number,
  newValue: number,
): Promise<AxiosResponse> => {
  try {
    const response = await api.patch(
      `/api/profiles/${profileId}/points/${newValue}`,
    );
    return response;
  } catch (error) {
    console.log('Rupee 갱신 실패', error);
    throw error;
  }
};

export { getRupee, patchRupee };
