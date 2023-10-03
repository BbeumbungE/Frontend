import { EventSourcePolyfill } from 'event-source-polyfill';

const SERVER_URL = process.env.REACT_APP_API_URL;
let eventSource: EventSourcePolyfill | null = null;

export function landingSSE(
  tempId: string,
  setIsLoading: (isOpen: boolean) => void,
  setCanvasUrl: (url: string) => void,
) {
  eventSource = new EventSourcePolyfill(
    `${SERVER_URL}/sse/canvases/demoId/${tempId}`,
    {
      heartbeatTimeout: 30000000, // SSE 재접속 시간
      withCredentials: true,
    },
  );

  console.log(eventSource);
  eventSource.onopen = () => {
    console.log('알람 연결 오픈');
  };

  eventSource.onmessage = (event) => {
    const parsedData = JSON.parse(event.data);
    console.log('임시 아이디 이벤트 수신:', parsedData);
  };

  eventSource.addEventListener('demo', (event) => {
    const parsedData = JSON.parse((event as MessageEvent).data);
    console.log('그림 변환 완료', parsedData);

    setIsLoading(false);
    setCanvasUrl(parsedData.canvasUrl);
  });

  eventSource.onerror = (error) => {
    console.error('SSE 연결 오류:', error);
  };
}

export function disconnectLandingSSE(): void {
  if (eventSource) {
    console.log('랜딩 SSE 끊기');
    eventSource.close();
    eventSource = null; // eventSource 변수를 초기화하여 재사용 방지
  }
}
