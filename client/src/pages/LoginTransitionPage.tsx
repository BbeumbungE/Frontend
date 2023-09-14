import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginTransition = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    // const userId = params.get('userId');
    if (accessToken !== null) {
      localStorage.setItem('accessToken', accessToken);
    }
    navigate('/profiles');
  }, []);

  return <div>Trans</div>;
};

export default LoginTransition;
