import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import theme from '../style/theme';
import { UserProfileState } from '../recoil/profile/atom';
import CharacterBackground from '../components/organisms/MyDrawingBackground';
import ExitBox from '../components/organisms/ExitBox';
import PageChangeButton from '../components/organisms/PageChangeButton';
import { getMyDrawing, deleteDrawing } from '../api/myDrawing';
import PhotoFrame from '../components/atoms/PhotoFrame';
import BlurBoxDiv from '../components/atoms/BlurBox';
import { ReactComponent as questionMarkIcon } from '../../assets/image/etc/questionMark.svg';

interface Status {
  httpStatus: string;
  code: number;
  message: string;
}

interface Data {
  canvasId: number;
  imageUrl: string;
}

interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
interface Content {
  canvasId: number;
  canvasUrl: string;
  sketchUrl: string;
  subjectName: string;
}

interface DetailResponse {
  status: Status;
  content: Content;
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  position: fixed;
  overflow: hidden;
`;

const TopText = styled.div<{ color: string }>`
  position: fixed;
  z-index: 300;
  top: 130px;
  left: 200px;
  font-size: 55px;
  color: ${(props) =>
    props.color === 'black'
      ? props.theme.colors.mainBlack
      : props.theme.colors.mainWhite};
`;

const GrayText = styled.div`
  position: fixed;
  z-index: 300;
  top: 300px;
  left: 36%;
  font-size: 35px;
  line-height: 80px;
  text-align: center;
  color: ${(props) => props.theme.colors.darkGray};
`;

const ModalTextWrapper = styled.div`
  width: 100%;
  z-index: 1000;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
`;

const ModalText = styled.span<{ color: string }>`
  z-index: 1000;
  position: absolute;
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 55px;
  color: ${(props) =>
    props.color === 'black'
      ? props.theme.colors.mainBlack
      : props.theme.colors.mainWhite};
`;

const PhotoFrameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 40px;
  margin-top: 20px;
  z-index: 300;
`;

const DetailWrapper = styled.div<{ isModalOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 40px;
  margin-top: 20px;
  z-index: ${(props) =>
    props.isModalOpen
      ? '1000'
      : '300'}; // 모달이 열려있을 때는 z-index를 큰 값으로 설정
`;

const Light = styled.div<{ flashing: boolean }>`
  position: absolute;
  top: -140px;
  left: 46%;
  transform: translate(-50%, -50%);
  margin: 40px;
  padding: 10px 25px;
  border-radius: 30px;
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    width: 50px;
    height: 100px;
    background-color: #ffec4445;
    transform: perspective(0.2rem) rotateX(10deg) scale(1, 0.5);
    filter: blur(0.2rem);
    transition: opacity 3s ease-in-out;
    opacity: ${({ flashing }) => (flashing ? 0 : 1)};
  }
`;

const BigFrame = styled(PhotoFrame)`
  width: 400px;
  height: 400px;
  cursor: default;
`;

const SubText = styled.div`
  text-align: center;
  font-family: 'TmoneyRoundWindRegular';
  color: ${(props) => props.theme.colors.mainGray};
  font-size: 30px;
  font-weight: 400;
  line-height: normal;
  z-index: 1000;
  position: absolute;
  bottom: 70px; // 원하는 여백 값으로 조정
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

function MyDrawingsPage() {
  const userProfile = useRecoilValue(UserProfileState);
  const [myDrawings, setMyDrawings] = useState<Data[] | undefined>();
  const [pageState, setPageState] = useState<PageInfo>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [detailDrawing, setDetailDrawing] = useState<Content>();
  const [flashing, setFlashing] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(0);

  const itemsPerPage = 3; // 한 페이지당 아이템 개수
  // 첫번째 페이지, 마지막 페이지 파악하는 변수
  const isFirstPage = currentPage === 0;
  const isLastPage = pageState && currentPage === pageState.totalPages - 1;
  // 화살표에 전달할 boolean 값
  const leftDisabled = isFirstPage;
  const rightDisabled = isLastPage;

  const leftOnClick = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    console.log('넘어가?');
  };

  const rightOnClick = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    console.log('넘어가?');
  };

  useEffect(() => {
    const getDrawings = async () => {
      try {
        const response = await getMyDrawing(
          userProfile.profileId,
          currentPage,
          itemsPerPage,
        );
        console.log('유저가 그린 그림', response);
        setMyDrawings(response.content.data);
        setPageState(response.content.pageInfo);
      } catch (error) {
        console.error(error);
      }
    };
    setTimeout(() => {
      getDrawings();
    }, 80);
  }, [currentPage, isModalOpen]);

  function hasJongseong(str: string) {
    if (!str) return false;

    const lastChar = str[str.length - 1];
    const charCode = lastChar.charCodeAt(0);

    // 영어로 끝나는 경우
    if (
      ['i', 'a', 'e', 'o', 'u'].includes(lastChar.toLowerCase()) &&
      charCode >= 97 &&
      charCode <= 122
    ) {
      return false;
    }

    // 한글 범위 안의 문자인지 확인
    if (charCode < 0xac00 || charCode > 0xd7a3) return false;

    return (charCode - 0xac00) % 28 > 0;
  }

  const handleDeleteClick = async (profileId: number, canvasId: number) => {
    try {
      setFlashing(true);
      const responseStatus = await deleteDrawing(profileId, canvasId);

      // 조명 깜빡깜빡 애니메이션을 3초 후에 종료
      setTimeout(() => {
        setFlashing(false);
      }, 3000);
      console.log('그림 삭제 성공', responseStatus);
    } catch (error) {
      console.error('그림 삭제 실패', error);
      setFlashing(false); // 실패 시 애니메이션을 종료
    }
  };

  const handleModal = () => {
    setIsModalOpen(true);
    console.log('그림 클릭!!!!');
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달을 닫는 함수
    console.log('모달 닫기');
  };

  console.log('모달 오픈', isModalOpen);
  console.log('내 상세 그림', detailDrawing?.canvasId);
  console.log('조명', flashing);

  return (
    <Wrapper>
      {isModalOpen ? (
        <ExitBox color="light" closeModal={closeModal} />
      ) : (
        <ExitBox color="dark" />
      )}
      <TopText color="black">
        {hasJongseong(userProfile.nickname)
          ? `${userProfile.nickname}이 그렸어요`
          : `${userProfile.nickname}가 그렸어요`}
      </TopText>
      <PageChangeButton
        leftOnClick={leftOnClick}
        rightOnClick={rightOnClick}
        leftDisabled={leftDisabled}
        rightDisabled={rightDisabled}
      />
      {myDrawings && myDrawings.length === 0 ? (
        <GrayText>
          {userProfile.nickname}의 그림이 아직 없어요 :( <br />
          그림을 그려서 채워보아요!
        </GrayText>
      ) : (
        <PhotoFrameWrapper>
          {myDrawings &&
            myDrawings.map((drawing) => (
              <PhotoFrame
                key={drawing.canvasId}
                url={drawing.imageUrl}
                profileId={userProfile.profileId}
                canvasId={drawing.canvasId}
                setDetailDrawing={setDetailDrawing}
                onClick={handleModal}
              />
            ))}
        </PhotoFrameWrapper>
      )}
      {isModalOpen && detailDrawing && (
        <>
          <BlurBoxDiv />
          <Light flashing={flashing} />
          <ModalText color="white">{detailDrawing.subjectName}</ModalText>
          <DetailWrapper isModalOpen={isModalOpen}>
            <BigFrame
              url={detailDrawing.sketchUrl}
              profileId={userProfile.profileId}
              canvasId={detailDrawing.canvasId}
            />
            <BigFrame
              url={detailDrawing.canvasUrl}
              profileId={userProfile.profileId}
              canvasId={detailDrawing.canvasId}
            />
          </DetailWrapper>
          <SubText
            onClick={() =>
              Swal.fire({
                title: '정말 삭제할까요?',
                showDenyButton: true,
                denyButtonText: '아니요',
                denyButtonColor: `${theme.colors.mainGray}`,
                confirmButtonColor: `${theme.colors.mainBlue}`,
                confirmButtonText: '네',
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDeleteClick(
                    userProfile.profileId,
                    detailDrawing.canvasId,
                  );
                  closeModal();
                } else {
                  closeModal();
                }
              })
            }
          >
            삭제하기
          </SubText>
        </>
      )}
      <CharacterBackground />
    </Wrapper>
  );
}

export default MyDrawingsPage;
