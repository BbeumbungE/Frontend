import React from 'react';
import styled from 'styled-components';
import theme from '../style/theme';
import PageHeaderText from '../components/atoms/PageHeaderText';
import kakaoLoginButton from '../assets/image/etc/start_kakao_login_large_wide.png';

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.mainSkyblue};
`;

const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1; /* PageHeaderText와 LoginButton 컴포넌트가 화면을 나눠 가질 수 있도록 flex 속성 추가 */
`;

const LoginButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const LoginPage = () => {
  const handleButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_KAUTH_URL}`;
  };

  return (
    <LoginPageContainer>
      <PageHeaderText
        content="로그인 및 회원가입"
        color="dark"
        fontSize="90px"
      />
      <LoginButtonContainer>
        <LoginButton onClick={handleButtonClick}>
          <img src={kakaoLoginButton} alt="kakao" width="600px" height="90px" />
        </LoginButton>
      </LoginButtonContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;
