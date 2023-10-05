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
        context.lineWidth = 2;
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

  useEffect(() => {
    resizeCanvas();
    console.log('리사이즈');
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.restore();
        context.save();

        const currentRatio = context.canvas.width / context.canvas.height;
        const newRatio = window.innerWidth / window.innerHeight;
        const xratio = window.innerWidth / context.canvas.width;
        const yratio = window.innerHeight / context.canvas.height;

        let screenSizeRatio;

        if (currentRatio > newRatio) {
          screenSizeRatio = xratio;
        } else {
          screenSizeRatio = yratio;
        }

        if (screenSizeRatio > 1) {
          screenSizeRatio = 1;
        }

        context.scale(screenSizeRatio, screenSizeRatio);
      }
    }
  };

  const startDraw = (event: React.MouseEvent | React.TouchEvent) => {
    event.persist();

    let offsetX = 0;
    let offsetY = 0;

    if ('touches' in event) {
      const touch = event.touches[0];
      if (touch) {
        const rect = event.currentTarget.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
      }
    } else {
      offsetX = event.nativeEvent.offsetX;
      offsetY = event.nativeEvent.offsetY;
    }
    setIsDrawing(true);
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    }
  };

  const drawing = (event: React.MouseEvent | React.TouchEvent) => {
    let offsetX = 0;
    let offsetY = 0;

    if ('touches' in event) {
      // 터치 이벤트인 경우
      const touch = event.touches[0];
      if (touch) {
        const rect = event.currentTarget.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
      }
    } else {
      // 마우스 이벤트인 경우
      offsetX = event.nativeEvent.offsetX;
      offsetY = event.nativeEvent.offsetY;
    }

    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  const stopDraw = () => {
    setIsDrawing(false);
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
            onMouseDown={startDraw}
            onMouseUp={stopDraw}
            onMouseMove={drawing}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={drawing}
            onTouchEnd={stopDraw}
          />
        )}
      </div>
      <BottomFrame />
      <BottomStick />
    </CanvasWrapper>
  );
};

export default LandingCanvas;
