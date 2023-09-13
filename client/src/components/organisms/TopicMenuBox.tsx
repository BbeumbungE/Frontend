import React from 'react';
import styled from 'styled-components';
import Menu from '../atoms/Menu';

interface MenuItem {
  id: number; // id 필드로 수정
  text: string;
  svg: string;
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
  return (
    <MenuWrapper>
      {/* <Menu
        buttonText={topicData.item.subject.subjectName}
        svgSrc={topicData.item.subject.subjectImage}
      /> */}
    </MenuWrapper>
  );
}

export default TopicMenuBox;
