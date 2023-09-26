import { atom } from 'recoil';

export interface SSEMessage {
  // SSE 메시지의 타입을 정의
  id: number;
  content: string;
  type: string;
  receiver: string;
  createdAt: any;
}

export const sseMessageState = atom<SSEMessage[]>({
  key: 'sseMessageState',
  default: [],
});
