import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  position: absolute;
  height: 12.5rem;
  bottom: 18.125rem;
  left: 14.375rem;
  z-index: 2;
`;

const LeftFrame = styled.div`
  width: 1.5rem;
  height: 14.75rem;
  transform: rotate(10.86deg);
  position: absolute;
  bottom: 1.5625rem;
  left: 7.375rem;
  background: #d9d9d9;
  z-index: 1;
`;

const RightFrame = styled.div`
  width: 1.5rem;
  height: 14.75rem;
  transform: rotate(-11.671deg);
  position: absolute;
  bottom: 1.5625rem;
  left: 20rem;
  background: #d9d9d9;
  z-index: 1;
`;

const SketchImage = styled.img`
  position: absolute;
  width: 28.125rem;
  height: 28.125rem;
  border-radius: 1.5625rem;
  z-index: 100;
`;

const BottomFrame = styled.div`
  width: 31.25rem;
  height: 2.125rem;
  position: absolute;
  left: -1.875rem;
  bottom: -15.625rem;
  background: #d9d9d9;
  z-index: 150;
  border-radius: 0.3125rem;
`;

const BottomStick = styled.div`
  width: 4.5625rem;
  height: 6.25rem;
  position: absolute;
  bottom: -18.75rem;
  left: 11.875rem;
  background: #d9d9d9;
  z-index: 1;
`;

const LandingCanvas = ({
  canvasRef,
  canvasUrl,
  isLoading,
  backSketchUrl,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvasUrl: string | undefined;
  isLoading: boolean;
  backSketchUrl: string;
}) => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined>();
  const [array, setArray] = useState<{ x: number; y: number }[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false); // 그리기 여부를 추정 (마우스 클릭중인지 여부)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = 'transparent'; // 캔버스 배경색을 투명으로 설정
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.lineJoin = 'round';
        context.lineWidth = 3;
        context.strokeStyle = 'black';
        setCtx(context);
      }
    }
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.fillStyle = 'gray';
      ctx.font = '1.5625rem TmoneyRoundWindRegular';
      ctx.fillText('판다를 그려주세요!', 125, 50); // 원하는 위치에 텍스트 추가
    }
  }, [ctx]);

  const canvasEventListener = (
    event: React.MouseEvent<HTMLCanvasElement>,
    type: string,
  ) => {
    if (isLocked) {
      return;
    }

    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    if (ctx) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 2;
      if (type === 'down') {
        setIsDrawing(true); // 마우스 클릭 시작
        array.push({ x, y });
      } else if (type === 'move' && isDrawing) {
        ctx?.save();
        ctx?.beginPath();
        ctx?.moveTo(array[array.length - 1].x, array[array.length - 1].y);
        ctx?.lineTo(x, y);
        ctx?.closePath();
        ctx?.stroke();
        ctx?.restore();
        array.push({ x, y });
      } else if (type === 'leave' || type === 'up') {
        setIsDrawing(false); // 마우스 클릭 종료
      }
    }
  };

  return (
    <CanvasWrapper>
      <LeftFrame />
      <RightFrame />
      <div
        className="container"
        style={{
          position: 'relative',
          padding: '0rem',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '28.125rem',
            height: '28.125rem',
            backgroundColor: 'white',
            borderRadius: '1.5625rem',
            zIndex: '100',
            padding: '0rem',
          }}
        />
        <SketchImage
          src={canvasUrl || backSketchUrl}
          alt="밑그림 이미지"
          style={{ display: isDrawing ? 'none' : 'block' }}
        />
        {!canvasUrl && (
          <canvas
            ref={canvasRef}
            width={450}
            height={450}
            style={{
              position: 'relative',
              borderRadius: '1.5625rem',
              zIndex: '100',
            }}
            onMouseDown={(event) => {
              canvasEventListener(event, 'down');
              // 마우스 클릭 시 이미지 요소 숨기기
            }}
            onMouseMove={(event) => {
              canvasEventListener(event, 'move');
            }}
            onMouseLeave={(event) => {
              canvasEventListener(event, 'leave');
            }}
            onMouseUp={(event) => {
              canvasEventListener(event, 'up');
            }}
          />
        )}
      </div>
      <BottomFrame />
      <BottomStick />
    </CanvasWrapper>
  );
};

export default LandingCanvas;
