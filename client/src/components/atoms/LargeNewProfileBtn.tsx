import React from 'react';
import styled from 'styled-components';
import theme from '../../style/theme';

interface LargeNewProfileBtnProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCharacter = styled.div`
  position: relative;
  display: inline-block;
  width: 20.125rem;
  height: 20.125rem;
  margin: 0.625rem;
  padding: 2.5rem;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s ease-in-out;
  background-color: ${theme.colors.mainWhite};
  cursor: pointer;
  z-index: 200;
  &::before {
    content: '+';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'TmoneyRoundWindRegular';
    font-size: 11.25rem; /* + 모양의 글꼴 크기 조절 */
    color: ${theme.colors.mainGray};
  }
`;

function NewProfileBtn({ onClick }: LargeNewProfileBtnProps) {
  return (
    <ProfileWrapper>
      <StyledCharacter onClick={onClick} />
    </ProfileWrapper>
  );
}

export default NewProfileBtn;
