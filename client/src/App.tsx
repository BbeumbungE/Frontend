import './App.css';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { Container } from './components/atoms/AlarmContainer';
import AppRouter from './route/AppRouter';
import { GlobalStyle } from './style/GlobalStyle';
import theme from './style/theme';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container limit={1} position="top-center" theme="colored" />
        <AppRouter />
      </ThemeProvider>
    </RecoilRoot>
  );
}
export default App;
