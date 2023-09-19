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
  width: 610px;
  height: 500px;
  background-color: ${theme.colors.mainSkyblue};
  border-radius: 25px;
  padding: 8px;
  border: 0;
  margin: 10px;
  position: relative;
`;

const AlarmBoardHeader = styled.span`
  text-align: center; /* 가로 중앙 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 세로 중앙 정렬 */
  font-family: 'TmoneyRoundWindExtraBold';
  font-size: 45px;
  margin: 33px;
  position: absolute;
  top: 10px;
`;

const AlarmItemDiv = styled.div`
  position: absolute;
  top: 100px;
  height: 400px;
`;
const AlarmItem = styled.div`
  font-family: 'TmoneyRoundWindRegular';
  font-size: 25px;
  margin: 30px; /* 알림 아이템 사이의 간격 조절 */
  width: 500px;
`;

const AlarmBoard = ({ alarms }: AlarmBoardProps) => {
  return (
    <AlarmBoardDiv>
      <AlarmBoardHeader>알림함</AlarmBoardHeader>
      <AlarmItemDiv>
        {alarms.map((alarm) => (
          <AlarmItem key={alarm.id}>{alarm.content}</AlarmItem>
        ))}
      </AlarmItemDiv>
    </AlarmBoardDiv>
  );
};

export default AlarmBoard;
