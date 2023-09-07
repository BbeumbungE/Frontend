import './App.css';
import AppRouter from './route/AppRouter';
import { GlobalStyle } from './style/GlobalStyle';
import { ThemeProvider } from 'styled-components';
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
