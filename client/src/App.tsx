import './App.css';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import AppRouter from './route/AppRouter';
import { GlobalStyle } from './style/GlobalStyle';
import theme from './style/theme';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRouter />
      </ThemeProvider>
    </RecoilRoot>
  );
}
export default App;
