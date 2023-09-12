import React from 'react';
import styled from 'styled-components';
import theme from '../style/theme';
import kakaoLoginButton from '../assets/image/etc/start_kakao_login_large_wide.png';

const LoginPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.mainSkyblue};
`;

const LoginButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const LoginPage = () => {
  const handleButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;
  };

  return (
    <LoginPageContainer>
      <LoginButton onClick={handleButtonClick}>
        <img src={kakaoLoginButton} alt="kakao" width="600px" height="90px" />
      </LoginButton>
    </LoginPageContainer>
  );
};

export default LoginPage;
