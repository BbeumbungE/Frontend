import { EventSourcePolyfill } from 'event-source-polyfill';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SERVER_URL = process.env.REACT_APP_API_URL;
let eventSource: EventSourcePolyfill | null = null;

export function connectEventSSE(profileId: number): void {
  eventSource = new EventSourcePolyfill(
    `${SERVER_URL}/sse/notifications/profiles/${profileId}`,
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
    toast(parsedData.content, {
      toastId: parsedData.content,
      pauseOnHover: true,
      autoClose: 4000,
    });
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
