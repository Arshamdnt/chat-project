// App.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Forum from './components/Forum';
import ThemeToggle from './components/ThemeToggle';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';

const App = () => {
  const darkMode = useSelector(state => state.theme.darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
        <ThemeToggle />
        <Forum />
      </div>
    </ThemeProvider>
  );
};

export default App;
