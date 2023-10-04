import styled from 'styled-components';
import theme from '../../style/theme';
import { getDrawingDetail } from '../../api/myDrawing';

interface Content {
  canvasId: number;
  canvasUrl: string;
  sketchUrl: string;
  subjectName: string;
}

interface PhotoFramProps {
  url: string;
  profileId: number;
  canvasId: number;
  setDetailDrawing?: (detailDrawing: Content) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  onClick?: () => void;
}

interface FramProps {
  url: string;
  onClick: () => void;
}

const Frame = styled.div<FramProps>`
  width: 300px;
  height: 300px;
  border: 25px solid #ecc055;
  border-radius: 5px;
  background: ${(props) => `
    url(${props.url}), white
     50% no-repeat;
  `};
  background-size: cover;
  cursor: pointer;
`;

const PhotoFrame = ({
  url,
  profileId,
  canvasId,
  setDetailDrawing,
  onClick,
}: PhotoFramProps) => {
  const handleFrameClick = async () => {
    try {
      if (onClick) {
        onClick();
      }
      const detailResponse = await getDrawingDetail(profileId, canvasId);
      console.log('그림 상세 정보:', detailResponse);
      if (setDetailDrawing) {
        setDetailDrawing(detailResponse.content);
      }
    } catch (error) {
      console.error('그림 조회 실패', error);
    }
  };

  return <Frame url={url} onClick={handleFrameClick} />;
};

PhotoFrame.defaultProps = {
  setDetailDrawing: undefined,
  onClick: undefined,
};

export default PhotoFrame;
