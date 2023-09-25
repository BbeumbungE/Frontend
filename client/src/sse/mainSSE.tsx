import { EventSourcePolyfill } from 'event-source-polyfill';

const SERVER_URL = process.env.REACT_APP_API_URL;
let eventSource: EventSourcePolyfill | null = null;

interface MessageEvent {
  type: string;
  target: any;
  data: string;
  lastEventId: string;
}

interface SSECallbacks {
  onMessage: (data: any) => void;
}
export function connectEventSSE(
  profileId: number,
  callbacks: SSECallbacks,
): void {
  eventSource = new EventSourcePolyfill(
    `${SERVER_URL}/api/profiles/${profileId}/sse/connects`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      heartbeatTimeout: 30000000,
      withCredentials: true,
    },
  );
  eventSource.onopen = () => {
    console.log('알람 연결 성공');
  };
  eventSource.onmessage = (event) => {
    const parsedData = JSON.parse(event.data);
    console.log('서버에서 이벤트 수신:', parsedData);
    callbacks.onMessage(parsedData);
  };
  eventSource.addEventListener('initial', (event) => {
    console.log('연결 시 서버에서 쏘는 데이터', event);
  });

  eventSource.onerror = (error) => {
    console.error('SSE 연결 오류:', error);
  };
}

export function disconnectEventSSE(): void {
  if (eventSource) {
    eventSource.close();
    eventSource = null; // eventSource 변수를 초기화하여 재사용 방지
  }
}
