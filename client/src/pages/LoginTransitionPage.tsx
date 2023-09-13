import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserTokenState } from '../recoil/token/atom';

const LoginTransition = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useRecoilState(UserTokenState);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    // const userId = params.get('userId');
    if (accessToken !== null) {
      setUserToken({ token: accessToken });
    }
    navigate('/profiles');
  }, []);

  return <div>Trans</div>;
};

export default LoginTransition;
