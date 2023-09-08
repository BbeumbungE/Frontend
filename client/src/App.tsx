import './App.css';
import { ThemeProvider } from 'styled-components';
import AppRouter from './route/AppRouter';
import { GlobalStyle } from './style/GlobalStyle';
import theme from './style/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  );
}
export default App;
