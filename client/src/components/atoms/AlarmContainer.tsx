import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import theme from '../../style/theme';

export const Container = styled(ToastContainer)`
  .Toastify__toast {
    font-size: 16px;
    font-family: 'TmoneyRoundWindRegular';
    border-radius: 20px;
    padding: 8px 14px;
    color: ${theme.colors.mainBlack};
    background: ${theme.colors.mainSkyblue};
  }

  .Toastify__toast-icon {
    width: 22px;
    height: 22px;
  }

  .Toastify__toast--info {
    background: ${theme.colors.mainSkyblue};
  }

  .Toastify__toast--success {
    background: rgba(48, 173, 120, 0.8);
  }

  .Toastify__toast--error {
    background: rgba(224, 72, 82, 0.8);
  }
  .Toastify__progress-bar {
    background: ${theme.colors.mainBlue};
  }
`;
