import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#d3ebeb',
      main: '#22535d',
      dark: '#1a424a',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#fdefe6',
      main: '#d3ebeb',
      dark: '#22535d',
      contrastText: '#000000',
    },
    background: {
      default: '#fdefe6',
      paper: '#ffffff',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#4a9195', 
      main: '#d3ebeb', 
      dark: '#22535d', 
      contrastText: '#121212', 
    },
    secondary: {
      light: '#3b3b3b', 
      main: '#2b2b2b', 
      dark: '#1a1a1a', 
      contrastText: '#d3ebeb', 
    },
    background: {
      default: '#121212', 
      paper: '#1e1e1e', 
    },
    text: {
      primary: '#d3ebeb', 
      secondary: '#a7c4c4', 
    },
  },
});

export {
  lightTheme,
  darkTheme
};
