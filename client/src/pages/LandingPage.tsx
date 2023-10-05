import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import theme from '../style/theme';
import { postTempId, postDrawing } from '../api/landing';
import LandingCanvas from '../components/organisms/LandingCanvas';
import Button from '../components/atoms/Button';
import { landingSSE, disconnectLandingSSE } from '../sse/landingSSE';
import { ReactComponent as CloudIcon } from '../assets/image/etc/cloud.svg';

interface SvgImageProps extends React.HTMLProps<HTMLImageElement> {
  'data-bottom'?: string;
  'data-right'?: string;
  isLoading?: boolean;
}

const cloudAnimationLeftToRight = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const cloudAnimationLeftToRightConverse = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const cloudAnimationRightToLeft = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const cloudAnimationRightToLeftConverse = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  position: fixed;
  overflow: hidden;
  background-color: ${theme.colors.mainSkyblue};
`;

const LogoText = styled.div`
  color: ${theme.colors.mainBlack};
  font-size: 80px;
  margin-top: 30px;
  text-align: center;
  letter-spacing: 30px;
  position: relative;
  z-index: 100;
`;

const BearImg = styled.img<SvgImageProps>`
  position: fixed;
  width: ${(props) => props.width || '150px'};
  height: ${(props) => props.height || '150px'};
  bottom: ${(props) => props['data-bottom'] || '0'};
  right: ${(props) => props['data-right'] || '0'};
  z-index: -2;
`;

const CloudImgFromLeft = styled(CloudIcon)<SvgImageProps>`
  position: fixed;
  width: ${(props) => props.width || '150px'};
  height: ${(props) => props.height || '150px'};
  bottom: ${(props) => props['data-bottom'] || '0'};
  right: ${(props) => props['data-right'] || '0'};
  z-index: 300;
  ${(props) =>
    props.isLoading
      ? css`
          animation: ${cloudAnimationLeftToRight} 3s forwards;
        `
      : css`
          animation: ${cloudAnimationLeftToRightConverse} 3s forwards;
        `}
`;

const CloudImgFromRight = styled(CloudIcon)<SvgImageProps>`
  position: fixed;
  width: ${(props) => props.width || '150px'};
  height: ${(props) => props.height || '150px'};
  bottom: ${(props) => props['data-bottom'] || '0'};
  right: ${(props) => props['data-right'] || '0'};
  z-index: 300;
  ${(props) =>
    props.isLoading
      ? css`
          animation: ${cloudAnimationRightToLeft} 4s forwards;
        `
      : css`
          animation: ${cloudAnimationRightToLeftConverse} 3s forwards;
        `}
`;

const BtnWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  left: 750px;
  display: flex;
  width: 302px;
  flex-wrap: wrap;
  gap: 10px;
`;

function LandingPage() {
  const navigate = useNavigate();
  const [tempId, setTempId] = useState<string | undefined>();
  const [backSketchUrl, setBackSketchUrl] = useState<string | undefined>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasUrl, setCanvasUrl] = useState<string | undefined>();
  const [isTransformed, setIsTransformed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const subjectId = 6;

  useEffect(() => {
    const getTempID = async () => {
      try {
        const postData = {
          subjectId,
        };

        const response = await postTempId(postData);
        setTempId(response.content.tempId);
        setBackSketchUrl(response.content.subjectSketch);
        console.log('임시 아이디 발급 완료', response);
      } catch (error) {
        console.error(error);
      }
    };
    getTempID();
  }, []);

  useEffect(() => {
    if (typeof tempId === 'string') {
      landingSSE(tempId, setIsLoading, setCanvasUrl);
      console.log('연결?');
    }
  }, [tempId]);

  const handleChange = async () => {
    if (isTransformed) {
      return;
    }
    // 화면 잠금, 변환 중 모달 오픈
    setIsLoading(true);

    if (canvasRef.current && tempId) {
      const imageDataURL = canvasRef.current.toDataURL('image/png');

      // 이미지 데이터 확인을 위한 img 요소 생성
      const imageElement = new Image();
      imageElement.src = imageDataURL;

      // 이미지를 콘솔에 출력하여 확인
      imageElement.onload = () => {
        console.log('ImageData:', imageDataURL);
      };
      const convertedImg = await fetch(imageDataURL);
      const blob = await convertedImg.blob();

      // 파일 식별을 위한 변수 생성
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();
      console.log('&&&&&&&', formattedTime);

      console.log('첫번째 변환 요청 보냄!!!');
      const formData = new FormData();
      formData.append('sketchFile', blob, `${formattedTime}.jpg`);

      formData.forEach(function (value, key) {
        console.log(`${key}: ${value}`);
      });

      const response = await postDrawing(subjectId, tempId, formData);

      console.log('변환하기 후 응답!', response);
      setIsTransformed(true);
    }
  };

  const handleNavigate = () => {
    navigate('/login');
    disconnectLandingSSE();
  };

  console.log('백스케치', backSketchUrl);
  console.log('변환횟수??', isTransformed);

  return (
    <PageWrapper>
      <LogoText>
        아이캔버스 <br />
        AI
        <br />
        canvas
      </LogoText>
      <CloudImgFromLeft
        width="1500px"
        height="1500px"
        data-bottom="-65%"
        data-right="20%"
        isLoading={isLoading}
      />
      <CloudImgFromRight
        width="1000px"
        height="1000px"
        data-bottom="-20%"
        data-right="-10%"
        style={{ transform: 'scaleX(-1)' }}
        isLoading={isLoading}
      />
      <CloudImgFromRight
        width="1250px"
        height="1250px"
        data-bottom="-70%"
        data-right="-10%"
        style={{ transform: 'scaleX(-1)', opacity: '0.9' }}
        isLoading={isLoading}
      />
      {tempId && backSketchUrl && (
        <>
          <LandingCanvas
            canvasRef={canvasRef}
            canvasUrl={canvasUrl}
            isLoading={isLoading}
            backSketchUrl={backSketchUrl}
          />
          <BearImg
            src={`${process.env.REACT_APP_IMG_URL}/service-image/mainBear.png`}
            alt="하얀 곰 이미지"
            width="660px"
            height="660px"
            data-bottom="-20%"
            data-right="7%"
          />
          <BtnWrapper>
            {!isTransformed && (
              <Button
                buttonText="변신하기"
                color="salmon"
                onClick={handleChange}
              />
            )}
            <Button
              buttonText="로그인 및 회원가입"
              color="blue"
              onClick={handleNavigate}
            />
          </BtnWrapper>
        </>
      )}
    </PageWrapper>
  );
}

export default LandingPage;
