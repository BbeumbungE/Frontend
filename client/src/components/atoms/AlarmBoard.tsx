import styled from 'styled-components';
import theme from '../../style/theme';

interface AlarmBoardProps {
  alarms: any[];
}

const AlarmBoardDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 38.125rem;
  height: 31.25rem;
  background-color: ${theme.colors.mainSkyblue};
  border-radius: 1.5625rem;
  padding: 0.5rem;
  border: 0;
  margin: 0.625rem;
  position: relative;
`;

const AlarmBoardHeader = styled.span`
  text-align: center; /* 가로 중앙 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 세로 중앙 정렬 */
  font-family: 'TmoneyRoundWindExtraBold';
  font-size: 2.8125rem;
  margin: 2.0625rem;
  position: absolute;
  top: 0.625rem;
`;

const AlarmItemDiv = styled.div`
  position: absolute;
  top: 6.25rem;
  height: 25rem;
  padding: 0.625rem;
`;
const AlarmItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex-direction: column; 컨텐츠를 위에서 아래로 나열하도록 수정 */
  font-family: 'TmoneyRoundWindRegular';
  font-size: 1.5625rem;
  margin: 1.875rem; /* 알림 아이템 사이의 간격 조절 */
  width: 31.25rem;
  position: relative; /* 추가 */
`;

const AlarmContent = styled.div`
  font-family: 'TmoneyRoundWindRegular';
  font-size: 1.5625rem;
  color: ${theme.colors.mainBlack};
`;

const AlarmCreateAt = styled.p`
  text-align: center;
  font-family: 'TmoneyRoundWindRegular';
  font-size: 0.9375rem;
  color: ${theme.colors.mainGray};
`;

const AlarmBoard = ({ alarms }: AlarmBoardProps) => {
  return (
    <AlarmBoardDiv>
      <AlarmBoardHeader>알림함</AlarmBoardHeader>
      <AlarmItemDiv>
        {alarms.map((alarm) => (
          <AlarmItem key={alarm.id}>
            {alarm.content && <AlarmContent>{alarm.content}</AlarmContent>}
            {alarm.createAt && (
              <AlarmCreateAt>
                {alarm.createAt.slice(5, 7)}월 {alarm.createAt.slice(8, 10)}일
              </AlarmCreateAt>
            )}
          </AlarmItem>
        ))}
      </AlarmItemDiv>
    </AlarmBoardDiv>
  );
};

export default AlarmBoard;
