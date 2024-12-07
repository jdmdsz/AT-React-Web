import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes';

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [themeMode, setThemeMode] = useState('light');

  const changeLanguage = useCallback((lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  }, [i18n]);

  const changeTheme = useCallback((mode) => {
    setThemeMode(mode);
    localStorage.setItem('themeMode', mode);
  }, []);

  const getUser = () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  };

  const user = getUser();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      changeLanguage(storedLanguage);
    } else {
      const navLang = navigator.language.split("-")[0];
      changeLanguage(navLang);
    }
    const storedThemeMode = localStorage.getItem('themeMode');
    if (storedThemeMode) {
      setThemeMode(storedThemeMode);
    }
  }, [changeLanguage]);

  const sharedState = {
    changeLanguage,
    t,
    user,
    themeMode,
    changeTheme,
  };

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <AppContext.Provider value={sharedState}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default AppProvider;
