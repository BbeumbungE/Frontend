import { EventSourcePolyfill } from 'event-source-polyfill';

const SERVER_URL = process.env.REACT_APP_API_URL;
let eventSource: EventSourcePolyfill | null = null;

export function drawingSSE(
  profileId: number,
  setModalOpen: (isOpen: boolean) => void,
  setCanvasUrl: (url: string) => void,
): void {
  eventSource = new EventSourcePolyfill(
    `${SERVER_URL}/sse/canvases/profile/${profileId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      heartbeatTimeout: 30000000, // SSE 재접속 시간
      withCredentials: true,
    },
  );

  eventSource.onopen = () => {
    console.log('알람 연결 오픈');
  };

  eventSource.onmessage = (event) => {
    const parsedData = JSON.parse(event.data);
    console.log('서버에서 그리기 이벤트 수신:', parsedData);
  };

  eventSource.addEventListener('initial', (event) => {
    console.log('연결 시 서버에서 쏘는 데이터', event);
  });

  eventSource.addEventListener('drawing', (event) => {
    const parsedData = JSON.parse((event as MessageEvent).data);
    console.log('그림 변환 완료', parsedData);

    setModalOpen(false);
    setCanvasUrl(parsedData.canvasUrl);
  });

  eventSource.onerror = (error) => {
    console.error('SSE 연결 오류:', error);
  };
}

export function disconnectDrawingSSE(): void {
  if (eventSource) {
    eventSource.close();
    eventSource = null; // eventSource 변수를 초기화하여 재사용 방지
  }
}
