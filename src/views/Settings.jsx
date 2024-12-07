import React, { useState, useEffect } from "react";
import { logout } from "../services/authentication";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Box, TextField, Typography } from "../components";
import { useAppContext } from '../Context';
import { useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const Settings = () => {
  const navigate = useNavigate();
  const { changeLanguage, t, themeMode, changeTheme } = useAppContext();
  const theme = useTheme();
  const [babyName, setBabyName] = useState("");
  const [babyWeight, setBabyWeight] = useState("");
  const [babyLength, setBabyLength] = useState("");

  useEffect(() => {
    const storedBabyInfo = localStorage.getItem("babyInfo");
    if (storedBabyInfo) {
      const { name, weight, length } = JSON.parse(storedBabyInfo);
      setBabyName(name || "");
      setBabyWeight(weight || "");
      setBabyLength(length || "");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const babyData = {
      name: babyName,
      weight: babyWeight,
      length: babyLength,
    };
    localStorage.setItem("babyInfo", JSON.stringify(babyData));
    navigate("/home");
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const handleThemeChange = (event) => {
    changeTheme(event.target.checked ? 'dark' : 'light');
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar title={t('settings_title')} showBackButton={true} />

      <Box
        m={2}
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          flexGrow: 1,
        }}
      >
        <Box mb={4}>
          <Typography variant="h5" color={theme.palette.primary.main}>
            {t('select_language')}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 1,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": { backgroundColor: theme.palette.primary.dark },
              }}
              onClick={() => changeLanguage('pt')}
            >
              Português
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": { backgroundColor: theme.palette.primary.dark },
              }}
              onClick={() => changeLanguage('en')}
            >
              English
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": { backgroundColor: theme.palette.primary.dark },
              }}
              onClick={() => changeLanguage('es')}
            >
              Español
            </Button>
          </Box>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" color={theme.palette.primary.main}>
            {t('select_theme')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 1,
              gap: 1,
            }}
          >
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: '500',
              }}
            >
              {t('light_theme')}
            </Typography>
            <Switch
              checked={themeMode === 'dark'}
              onChange={handleThemeChange}
              inputProps={{ 'aria-label': 'theme switch' }}
            />
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: '500',
              }}
            >
              {t('dark_theme')}
            </Typography>
          </Box>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" color={theme.palette.primary.main}>
            {t('baby_info')}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label={t('baby_name')}
              value={babyName}
              onChange={(e) => setBabyName(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label={t('baby_weight')}
              type="number"
              value={babyWeight}
              onChange={(e) => setBabyWeight(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label={t('baby_length')}
              type="number"
              value={babyLength}
              onChange={(e) => setBabyLength(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": { backgroundColor: theme.palette.primary.dark },
                marginTop: 2,
              }}
            >
              {t('save')}
            </Button>
          </form>
        </Box>

        <Box>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
            fullWidth
          >
            {t('logout')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
