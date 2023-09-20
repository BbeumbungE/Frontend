const SERVER_URL = process.env.REACT_APP_API_URL;
let eventSource: EventSource | null = null;

export function drawingSSE(profileId: number): void {
  eventSource = new EventSource(
    `${SERVER_URL}/api/canvases/profile/${profileId}/sse`,
  );

  eventSource.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    console.log('서버에서 이벤트 수신:', data);
  };

  eventSource.onerror = (error: Event) => {
    console.error('SSE 연결 오류:', error);
  };
}

export function disconnectDrawingSSE(): void {
  if (eventSource) {
    eventSource.close();
    eventSource = null; // eventSource 변수를 초기화하여 재사용 방지
  }
}
