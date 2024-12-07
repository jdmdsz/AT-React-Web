import React, { useEffect, useState } from "react";
import { IconButton, Grid, Avatar, Box, Typography } from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import babyImage from "../assets/baby.png";
import { useNavigate } from "react-router-dom";
import { list, deleteItem } from "../services/database";
import CardNewItem from "../components/custom/cardNewItem";
import CustomList from "../components/custom/customList";
import { ACTIONS } from "../constants/actions";
import { useAppContext } from "../Context";
import { useTheme } from '@mui/material/styles';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useAppContext();
  const theme = useTheme();
  const [data, setData] = useState([]);
  const actions = ACTIONS();

  const [babyName, setBabyName] = useState(t("baby_name"));
  const [babyWeight, setBabyWeight] = useState("0 kg");
  const [babyLength, setBabyLength] = useState("0 cm");

  useEffect(() => {
    const items = list();
    if (items) setData(items);

    const storedBabyInfo = localStorage.getItem("babyInfo");
    if (storedBabyInfo) {
      const { name, weight, length } = JSON.parse(storedBabyInfo);
      setBabyName(name || t("baby_name"));
      setBabyWeight(weight ? `${weight} kg` : "0 kg");
      setBabyLength(length ? `${length} cm` : "0 cm");
    }
  }, [t]);

  const handleRemove = (id) => {
    deleteItem(id);
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.secondary.main,
        overflow: "auto",
      }}
    >
      <Grid item xs={12} sx={{ height: '30vh', backgroundColor: theme.palette.secondary.light }}>
        <Grid container alignItems="flex-end" sx={{ marginTop: '1em' }}>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton
                sx={{
                  height: '2.5em',
                  width: '2.5em',
                  border: `2px solid ${theme.palette.primary.main}`,
                }}
                onClick={() => navigate("/dashboard")}
                aria-label={t("dashboard_title")}
              >
                <SignalCellularAltIcon sx={{ fontSize: '1.5em', color: theme.palette.primary.main }} />
              </IconButton>
              <Box sx={{ marginTop: '.5em', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '.8em', fontWeight: '600', color: theme.palette.primary.main }}>
                  {babyLength}
                </Typography>
                <Typography sx={{ fontSize: '.8em', fontWeight: '400', color: theme.palette.primary.main }}>
                  {t("baby_length")}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar src={babyImage} sx={{ width: 90, height: 90 }} />
              <Box sx={{ marginTop: '.5em', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.2em', fontWeight: '500', color: theme.palette.primary.main }}>
                  {babyName}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconButton
                sx={{
                  height: '2.5em',
                  width: '2.5em',
                  border: `2px solid ${theme.palette.primary.main}`,
                }}
                onClick={() => navigate("/settings")}
                aria-label={t("settings_title")}
              >
                <SettingsIcon sx={{ fontSize: '1.5em', color: theme.palette.primary.main }} />
              </IconButton>
              <Box sx={{ marginTop: '.5em', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '.8em', fontWeight: '600', color: theme.palette.primary.main }}>
                  {babyWeight}
                </Typography>
                <Typography sx={{ fontSize: '.8em', fontWeight: '400', color: theme.palette.primary.main }}>
                  {t("baby_weight")}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ padding: 2 }}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {actions.map((action) => (
                <Grid item xs={4} key={action.actionType}>
                  <CardNewItem
                    title={action.title}
                    Icon={action.Icon}
                    color={action.color}
                    actionType={action.actionType}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid container sx={{ marginTop: '1em' }}>
              <Grid item xs={12}>
                <CustomList
                  items={data}
                  sx={{
                    overflow: "auto",
                    maxHeight: "56.5vh",
                  }}
                  onRemove={handleRemove}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
