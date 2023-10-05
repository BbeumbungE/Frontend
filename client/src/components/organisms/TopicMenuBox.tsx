/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import Menu from '../atoms/Menu';

interface MenuItem {
  id: number; // id 필드로 수정
  subjectName: string;
  subjectImage: string;
  subjectId?: number;
  sketch: string;
}

interface Status {
  httpStatus: string;
  code: number;
  message: string;
}

interface Sketch {
  sketchId: number;
  sketchImageUrl: string;
}

interface Subject {
  id: number;
  subjectName: string;
  subjectImage: string;
  sketchList: Sketch[];
}

interface Items {
  id: number;
  itemPrice: number;
  hasItem: boolean;
  subject: Subject;
}

interface Content {
  id: number;
  item: Items;
  itemPrice: number;
}

interface Item {
  id: number;
  sketchList: Sketch[];
  subjectImage: string;
  subjectName: string;
}

interface AvatarResponse {
  id: number;
  avatarName: string;
  avatarImage: string;
}

interface Item {
  id: number;
  itemPrice: number;
  hasItem: boolean;
  avatarResponse: AvatarResponse;
}

interface TopicDrawingMenuProps {
  topicData: Content[] | Item[];
  // transparencyButton?: boolean;
}

// interface DataItem {
//   id: number;
//   itemType: string;
//   item: Item;
// }

// interface PageInfo {
//   page: number;
//   size: number;
//   totalElements: number;
//   totalPages: number;
// }

// interface Content {
//   data: DataItem[];
//   pageInfo: PageInfo;
// }

const MenuWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function isContent(obj: any): obj is Content {
  return 'item' in obj;
}

// function isItem(obj: any): obj is Item {
//   return 'avatarResponse' in obj;
// }

function TopicMenuBox({ topicData }: TopicDrawingMenuProps) {
  console.log('토픽 데이터', topicData);
  return (
    <MenuWrapper>
      {topicData.map((data, index) => {
        if (isContent(data)) {
          const subject = data.item;
          if (subject) {
            console.log('위:', data); // Content 타입의 데이터를 출력
            return (
              <Menu
                key={subject.id}
                color={
                  index === 0
                    ? 'pink'
                    : index === 1
                    ? 'green'
                    : index === 2
                    ? 'mint'
                    : 'yellow'
                }
                buttonText={subject.subject.subjectName}
                svgSrc={subject.subject.subjectImage}
                srcId={subject.id}
              />
            );
          }
        } else if ('subjectName' in data) {
          console.log('아래:', data); // Item 타입의 데이터를 출력
          return (
            <Menu
              key={data.id}
              color={
                index === 0
                  ? 'pink'
                  : index === 1
                  ? 'green'
                  : index === 2
                  ? 'mint'
                  : 'yellow'
              }
              buttonText={data.subjectName}
              svgSrc={data.subjectImage}
              transparencyButton
              srcId={data.id}
            />
          );
        }
        return null;
      })}
    </MenuWrapper>
  );
}

export default TopicMenuBox;
