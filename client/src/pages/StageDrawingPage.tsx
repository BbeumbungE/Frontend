import { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ProgressBar from '../components/atoms/ProgressBar';
import ExitBox from '../components/organisms/ExitBox';
import Button from '../components/atoms/Button';
import { ReactComponent as PencilIcon } from '../assets/image/etc/pencil.svg';
import { ReactComponent as MagicStickIcon } from '../assets/image/etc/magicStick.svg';
import { ReactComponent as LockIcon } from '../assets/image/etc/drawingLock.svg';

const defaultStyle = {
  display: 'inline-block',
  background: 'white', // 배경을 하얀색으로 설정
  borderRadius: '25px', // 테두리의 모서리를 둥글게 만듦
  marginRight: '-50px',
  zIndex: '-100',
};

const DrawingPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background-color: ${(props) => props.theme.stageColors.lightGreen};
  position: fixed;
  overflow: hidden;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 30px;
  margin-left: 5px;
`;

const CanvasWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 25px;
  margin-left: -50px;
  z-index: -100;
`;

const BottomWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ToolWrapper = styled.span`
  margin-right: 100px; /* 요소들 사이의 간격을 조정할 수 있습니다. */
  display: flex;
`;

const Lock = styled(LockIcon)`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 20px;
  left: 20px;
  /* z-index: 1; */
`;

const Pencil = styled(PencilIcon)`
  width: 300px;
  height: 300px;
  cursor: pointer;
`;

const Eraser = styled(PencilIcon)`
  width: 300px;
  height: 300px;
  cursor: pointer;
  transform: scaleY(-1);
`;

const MagicStick = styled(MagicStickIcon)`
  width: 320px;
  height: 320px;
  cursor: pointer;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

function StageDrawingPage() {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [array, setArray] = useState<{ x: number; y: number }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false); // 마우스 클릭 중인지 여부를 추적
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.lineJoin = 'round';
        context.lineWidth = 3;
        context.strokeStyle = 'black';
        setCtx(context);
      }
    }
  }, []);

  const canvasEventListener = (
    event: React.MouseEvent<HTMLCanvasElement>,
    type: string,
  ) => {
    if (isLocked) {
      return; // Lock 상태에서는 그림을 그리지 않음
    }

    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

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

  const handleClearCanvas = () => {
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setArray([]);
    }
  };

  const handleToggleLock = () => {
    setIsLocked(true);
  };

  const handleToggleEdit = () => {
    setIsLocked(false); // 수정하기 버튼을 누르면 잠금 해제
  };

  return (
    <DrawingPageWrapper>
      <ProgressBar durationInSeconds={60} />
      <TopWrapper>
        <ExitBox color="dark" />
        <Button buttonText="완성 !" color="salmon" />
      </TopWrapper>
      <CanvasWrapper>
        <div
          className="container"
          style={{ position: 'relative', zIndex: '-100' }}
        >
          <Lock style={{ display: isLocked ? 'block' : 'none' }} />
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
        <Button
          buttonText="변신하기"
          color="green"
          onClick={handleToggleLock}
        />
        {/* <StyledImage src={imgSrc || ''} alt="이미지" />; */}
        <StyledImage src="" alt="이미지" />
      </CanvasWrapper>
      <BottomWrapper>
        <ToolWrapper>
          <Pencil />
          <Eraser />
          <MagicStick />
        </ToolWrapper>
        <BtnWrapper>
          <Button
            buttonText="수정하기"
            color="lightGreen"
            onClick={handleToggleEdit}
          />
          <Button
            buttonText="모두 지우기"
            color="lightGreen"
            onClick={handleClearCanvas}
          />
        </BtnWrapper>
      </BottomWrapper>
    </DrawingPageWrapper>
  );
}

export default StageDrawingPage;
