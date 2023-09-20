import { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { UserProfileState } from '../recoil/profile/atom';
import { StageIdState } from '../recoil/stage/atom';
import { drawingSSE, disconnectDrawingSSE } from '../sse/drawingSSE';
import BlurBox from '../components/atoms/BlurBox';
import CheckingModal from '../components/organisms/CheckingModal';
import ProgressBar from '../components/atoms/ProgressTimeBar';
import ExitBox from '../components/organisms/ExitBox';
import Button from '../components/atoms/Button';
import { getLevelDetail, postDrawing } from '../api/drawing';
import { ReactComponent as PencilIcon } from '../assets/image/etc/pencil.svg';
import { ReactComponent as MagicStickIcon } from '../assets/image/etc/magicStick.svg';
import { ReactComponent as LockIcon } from '../assets/image/etc/drawingLock.svg';

interface ApiResponse {
  id: number;
  stageNum: number;
  point: number;
  timeLimit: number;
  subject: {
    id: number;
    subjectName: string;
    subjectImage: string;
    sketch: string;
  };
}

const defaultStyle = {
  display: 'inline-block',
  background: 'white',
  borderRadius: '25px',
  marginRight: '-50px',
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

const BtnFloating = styled.div`
  z-index: 200;
`;

const BottomWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ToolWrapper = styled.span`
  margin-right: 100px;
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
  const stageId = useRecoilValue(StageIdState);
  const profileState = useRecoilValue(UserProfileState);
  const [data, setData] = useState<ApiResponse | undefined>();
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [array, setArray] = useState<{ x: number; y: number }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false); // 마우스 클릭 중인지 여부를 추적
  const [isLocked, setIsLocked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$데이터', data);
  useEffect(() => {
    const getData = async () => {
      try {
        if (stageId !== null) {
          const response = await getLevelDetail(stageId);
          setData(response.content);
          console.log('스테이지 단건조회', response);
        } else {
          console.error('stageId가 null');
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();

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

  // 변신하기 버튼
  const handleChange = () => {
    // 화면 잠금, 변환 중 모달 오픈
    setIsLocked(true);
    setIsModalOpen(true);

    if (canvasRef.current) {
      const imageDataURL = canvasRef.current.toDataURL('image/png');
      const formData = new FormData();
      formData.append('sketchFile', imageDataURL);
      // formData.append('profileId');
      // formData.append('subjectId');
      // const response = await postDrawing(
      //   yourProfileId,
      //   yourSubjectId,
      //   formData,
      // );
    }

    // SSE 연결 함수 호출
    drawingSSE(profileState.profileId);

    // SSE 연결 해제 함수 호출
    disconnectDrawingSSE();
  };

  const handleToggleEdit = () => {
    setIsLocked(false);
  };

  return (
    <DrawingPageWrapper>
      {isModalOpen && (
        <>
          <BlurBox />
          <CheckingModal />
        </>
      )}
      {data && (
        <>
          <ProgressBar durationInSeconds={data?.timeLimit} />
          <TopWrapper>
            <ExitBox color="dark" />
            <Button buttonText="완성 !" color="salmon" />
          </TopWrapper>
          <CanvasWrapper>
            <div className="container" style={{ position: 'relative' }}>
              {data && (
                <img
                  src={data.subject.sketch || ''}
                  alt="이미지"
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    zIndex: '1',
                    width: '500px',
                    height: '500px',
                  }}
                />
              )}
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
            <BtnFloating>
              <Button
                buttonText="변신하기"
                color="green"
                onClick={handleChange}
              />
            </BtnFloating>
            <StyledImage src={data.subject.sketch || ''} alt="이미지" />
            {/* <StyledImage src="" alt="이미지" /> */}
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
        </>
      )}
    </DrawingPageWrapper>
  );
}

export default StageDrawingPage;
