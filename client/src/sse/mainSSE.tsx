import { EventSourcePolyfill } from 'event-source-polyfill';

const SERVER_URL = process.env.REACT_APP_API_URL;
let eventSource: EventSourcePolyfill | null = null;

export function connectEventSSE(profileId: number): void {
  eventSource = new EventSourcePolyfill(
    `${SERVER_URL}/api/profiles/${profileId}/sse/connects`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      withCredentials: true,
    },
  );
  eventSource.onopen = () => {
    console.log('알람 연결 성공');
  };
  eventSource.onmessage = (event: any) => {
    const parsedData = JSON.parse(event.data);
    console.log('서버에서 이벤트 수신:', parsedData);
  };

  eventSource.onerror = (error: any) => {
    console.error('SSE 연결 오류:', error);
  };
}

export function disconnectEventSSE(): void {
  if (eventSource) {
    eventSource.close();
    eventSource = null; // eventSource 변수를 초기화하여 재사용 방지
  }
}
