import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  position: absolute;
  height: 200px;
  bottom: 290px;
  left: 230px;
  z-index: 2;
`;

const LeftFrame = styled.div`
  width: 24px;
  height: 236px;
  transform: rotate(10.86deg);
  position: absolute;
  bottom: 25px;
  left: 118px;
  background: #d9d9d9;
  z-index: 1;
`;

const RightFrame = styled.div`
  width: 24px;
  height: 236px;
  transform: rotate(-11.671deg);
  position: absolute;
  bottom: 25px;
  left: 320px;
  background: #d9d9d9;
  z-index: 1;
`;

const SketchImage = styled.img`
  position: absolute;
  width: 450px;
  height: 450px;
  border-radius: 25px;
  z-index: 100;
`;

const BottomFrame = styled.div`
  width: 500px;
  height: 34px;
  position: absolute;
  left: -30px;
  bottom: -250px;
  background: #d9d9d9;
  z-index: 150;
  border-radius: 5px;
`;

const BottomStick = styled.div`
  width: 73px;
  height: 100px;
  position: absolute;
  bottom: -300px;
  left: 190px;
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
      ctx.font = '25px TmoneyRoundWindRegular';
      ctx.fillText('판다를 그려주세요!', 125, 50); // 원하는 위치에 텍스트 추가
    }
  }, [ctx]);

  const canvasEventListener = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
    type: string,
  ) => {
    if (isLocked) {
      return;
    }

    let x = 0;
    let y = 0;

    // if ('touches' in event) {
    //   // Touch event
    //   const touch = event.touches[0];
    //   if (touch) {
    //     x =
    //       (touch.clientX ?? 0) -
    //       (canvasRef.current!.getBoundingClientRect().left ?? 0);
    //     y =
    //       (touch.clientY ?? 0) -
    //       (canvasRef.current!.getBoundingClientRect().top ?? 0);
    //   } else {
    //     x = 0;
    //     y = 0;
    //   }
    // } else {
    //   // Mouse event
    //   x = event.nativeEvent.offsetX;
    //   y = event.nativeEvent.offsetY;
    // }

    if ('touches' in event) {
      const canvas = canvasRef.current as HTMLCanvasElement;
      if (canvas) {
        const touch = event.touches[0];
        if (touch) {
          x = touch.clientX - canvas.offsetLeft;
          y =
            touch.clientY -
            canvas.offsetTop +
            document.documentElement.scrollTop;

          console.log('터치일 때 ! ! y', x);
        }
      }
    } else {
      x = event.nativeEvent.offsetX;
      y = event.nativeEvent.offsetY;
    }

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
          padding: '0px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '450px',
            height: '450px',
            backgroundColor: 'white',
            borderRadius: '25px',
            zIndex: '100',
            padding: '0px',
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
              borderRadius: '25px',
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
            onTouchStart={(event) => {
              canvasEventListener(event, 'down');
            }}
            onTouchMove={(event) => {
              canvasEventListener(event, 'move');
            }}
            onTouchEnd={(event) => {
              canvasEventListener(event, 'leave');
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
