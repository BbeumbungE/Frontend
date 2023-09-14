import styled from 'styled-components';
import Menu from '../atoms/Menu';

interface MenuItem {
  id: number; // id 필드로 수정
  subjectName: string;
  subjectImage: string;
  sketch: string;
}

interface TopicMenuBoxProps {
  topicData: MenuItem[];
}

const MenuWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function TopicMenuBox({ topicData }: TopicMenuBoxProps) {
  console.log('########## 전달된 ', topicData);
  return (
    <MenuWrapper>
      {topicData.length > 0 && (
        <Menu
          color="pink"
          buttonText={topicData[0].subjectName}
          svgSrc={topicData[0].subjectImage}
        />
      )}
      {topicData.length > 1 && (
        <Menu
          color="green"
          buttonText={topicData[1].subjectName}
          svgSrc={topicData[1].subjectImage}
        />
      )}
      {topicData.length > 2 && (
        <Menu
          color="mint"
          buttonText={topicData[2].subjectName}
          svgSrc={topicData[2].subjectImage}
        />
      )}
      {topicData.length > 3 && (
        <Menu
          color="yellow"
          buttonText={topicData[3].subjectName}
          svgSrc={topicData[3].subjectImage}
        />
      )}
    </MenuWrapper>
  );
}

export default TopicMenuBox;
