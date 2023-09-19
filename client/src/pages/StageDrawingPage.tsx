import { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ProgressBar from '../components/atoms/ProgressBar';
import ExitBox from '../components/organisms/ExitBox';
import Button from '../components/atoms/Button';
import { ReactComponent as PencilIcon } from '../assets/image/etc/pencil.svg';

const defaultStyle = {
  display: 'inline-block',
  margin: '1rem',
  background: 'white', // 배경을 하얀색으로 설정
  borderRadius: '25px', // 테두리의 모서리를 둥글게 만듦
};

const DrawingPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background-color: ${(props) => props.theme.stageColors.lightGreen};
  position: fixed;
  overflow: hidden;
`;

const Pencil = styled(PencilIcon)`
  width: 300px;
  height: 300px;
  position: fixed;
  bottom: -130px;
`;

const Eraser = styled(PencilIcon)`
  width: 200px;
  height: 300px;
  position: fixed;
  bottom: -130px;
  transform: rotateX(90deg);
`;

function StageDrawingPage() {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [array, setArray] = useState<{ x: number; y: number }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false); // 마우스 클릭 중인지 여부를 추적

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.lineJoin = 'round';
        context.lineWidth = 3;
        context.strokeStyle = 'blue';
        setCtx(context);
      }
    }
  }, []);

  const canvasEventListener = (
    event: React.MouseEvent<HTMLCanvasElement>,
    type: string,
  ) => {
    const x = event.clientX - event.currentTarget.offsetLeft;
    const y = event.clientY - event.currentTarget.offsetTop;

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
  };

  return (
    <DrawingPageWrapper>
      <ProgressBar durationInSeconds={60} />
      <ExitBox color="dark" />
      <Button buttonText="변신하기" color="green" />
      <div className="container">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          style={defaultStyle}
          onMouseDown={(event) => {
            canvasEventListener(event, 'down');
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
      </div>
      <Pencil />
      <Eraser />
    </DrawingPageWrapper>
  );
}

export default StageDrawingPage;
