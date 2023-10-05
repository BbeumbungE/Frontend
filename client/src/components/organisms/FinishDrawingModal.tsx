/* eslint-disable react/jsx-no-bind */
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { UserProfileState } from '../../recoil/profile/atom';
import { UserRupeeState } from '../../recoil/rupee/atom';
import BlurBox from '../atoms/BlurBox';
import LevelStars from './LevelStars';
import { ReactComponent as Rupee } from '../../assets/image/etc/rupee.svg';
import Button from '../atoms/Button';
import theme from '../../style/theme';
import { postTopicDrawing } from '../../api/topic';

interface ModalProps {
  canvasId: number;
  canvasUrl: string;
}

const pulseAnimation = keyframes`
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.4;
  }
`;

const transpWhite = '#ffffff5e';

const sparkle = keyframes`
  50% {
    opacity: 0.4;
    transform: scale(7);
    box-shadow: 0px 0px 30px 20px ${transpWhite};
  }
  50% {
    opacity: 1;
    transform: scale(7);
    box-shadow: 0px 0px 30px 20px white;
  }
  100% {
    opacity: 0;
    transform: scale(7.5);
    box-shadow: 0px 0px 30px 20px ${transpWhite};
  }
`;

const jumpAnimation = keyframes`
  0% {
    bottom: 0;
  }
  50% {
    bottom: 20px;
  }
  100% {
    bottom: 0;
  }
`;

const Star = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  opacity: 0;
  animation: ${sparkle} 4s infinite alternate;
  z-index: 0;
  margin-bottom: 250px;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 50px;
  width: 500px;
  height: 660px;
  border-radius: 25px;
  position: relative;
  z-index: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopImage = styled.img`
  width: 380px;
  height: 380px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 15px;
  border-radius: 25px;
  position: relative;
  z-index: 100;
`;

const TopImageSkeleton = styled.div`
  width: 300px;
  height: 300px;
  background-color: #ccc;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 15px;
  animation: ${pulseAnimation} 1.5s infinite;
  border-radius: 25px;
`;

const CharacterImage = styled.div<{
  $bgImage: string | null;
  $position: { left: number; bottom: number };
}>`
  width: 500px;
  height: 500px;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 500;
  transition:
    right 1s ease,
    bottom 1s ease;
  left: ${(props) => `${props.$position.left}px`};
  bottom: ${(props) => `${props.$position.bottom}px`};
  animation: ${jumpAnimation} 1s infinite;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 700px;
`;

function FinishDrawingModal({ canvasId, canvasUrl }: ModalProps) {
  const navigate = useNavigate();
  const userProfile = useRecoilValue(UserProfileState);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleConfirm = async () => {
    try {
      const response = await postTopicDrawing(canvasId);
      console.log('게시물 올리기 성공', response);
      Swal.fire({
        title: '그림이 잘 올라갔어요!',
        showDenyButton: false,
        confirmButtonColor: `${theme.colors.mainBlue}`,
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/menu/draw');
        }
      });
      return response.data;
    } catch (error) {
      console.log('게시물 올리기 실패', error);
      throw error;
    }
  };

  function handleSave() {
    if (isSaved) {
      Swal.fire({
        title: '이미 저장된 그림이에요',
        showDenyButton: false,
        confirmButtonColor: `${theme.colors.mainBlue}`,
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('이미 저장된 그림');
        }
      });
    } else if (!isSaved) {
      fetch(canvasUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = '변환된 그림.jpg';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            window.URL.revokeObjectURL(blobUrl);
          }, 60000);
          a.remove();

          Swal.fire({
            title: '그림이 컴퓨터에 저장되었어요',
            showDenyButton: false,
            confirmButtonColor: `${theme.colors.mainBlue}`,
            confirmButtonText: '확인',
          }).then((result) => {
            if (result.isConfirmed) {
              setIsSaved(true);
              console.log('이미지 다운로드 성공');
            }
          });
        })
        .catch((error) => {
          console.error('이미지 다운로드 에러', error);
        });
    }
  }

  return (
    <>
      <ModalWrapper>
        {canvasUrl ? (
          <TopImage src={canvasUrl} alt="최종 변환된 그림" />
        ) : (
          <TopImageSkeleton />
        )}
        <ButtonWrapper>
          <Button buttonText="저장하기" color="green" onClick={handleSave} />
          <Button
            buttonText="랭킹 참여하기"
            color="green"
            onClick={handleConfirm}
          />
          <Button buttonText="공유하기" color="green" onClick={handleConfirm} />
        </ButtonWrapper>
      </ModalWrapper>
      <CharacterImage
        $bgImage={userProfile.profileImg}
        $position={{ left: 0, bottom: -100 }}
      />
    </>
  );
}

export default FinishDrawingModal;
