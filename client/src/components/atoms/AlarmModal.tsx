import styled from 'styled-components';
import theme from '../../style/theme';

interface AlarmModalProps {
  content: string;
}
const AlarmDiv = styled.div`
  text-align: center; /* 가로 중앙 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 세로 중앙 정렬 */
  font-family: 'TmoneyRoundWindRegular';
  font-size: 30px;
  position: fixed;
  top: 20px;
  background-color: ${theme.colors.mainSkyblue};
  border-radius: 25px;
  height: 50px;
  z-index: 500;
`;

const AlarmModal = ({ content }: AlarmModalProps) => {
  return <AlarmDiv>{content}</AlarmDiv>;
};

export default AlarmModal;
