import React, { useState, useEffect } from "react";
import { AppBar, Box, Typography } from "../components";
import { list, deleteItem } from "../services/database";
import CustomList from "../components/custom/customList";
import { useAppContext } from '../Context';
import { useTheme } from '@mui/material/styles';

const SummaryCard = ({ title, value }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: 2,
        borderRadius: 2,
        boxShadow: 1,
        textAlign: "center",
        flex: "1 1 180px",
        minWidth: "150px",
      }}
    >
      <Typography variant="subtitle1" color={theme.palette.primary.main}>
        {title}
      </Typography>
      <Typography variant="h6" color={theme.palette.primary.main}>
        {value}
      </Typography>
    </Box>
  );
};

const Dashboard = () => {
  const { t } = useAppContext();
  const theme = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    const items = list();
    if (items) setData(items);
  }, []);

  const handleRemove = (id) => {
    deleteItem(id);
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const calculateTotal = (actionType, key) => 
    data.filter(item => item.action_type === actionType).length;

  const calculateTotalTime = (actionType) => 
    Math.round(
      data
        .filter(item => item.action_type === actionType && item.startTime && item.endTime)
        .reduce((total, item) => {
          const start = new Date(item.startTime);
          const end = new Date(item.endTime);
          return total + (end - start) / (1000 * 60);
        }, 0)
    );

  const summaryData = [
    { title: t('total_sleeps'), value: calculateTotal("1") },
    { title: t('total_sleep_time'), value: `${calculateTotalTime("1")} min` },
    { title: t('total_feedings'), value: calculateTotal("2") },
    { title: t('total_feeding_time'), value: `${calculateTotalTime("2")} min` },
    { title: t('total_diapers'), value: calculateTotal("3") },
  ];

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar title={t('dashboard_title')} showBackButton />

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
        <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
          {t('activity_summary')}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mb: 4,
          }}
        >
          {summaryData.map(({ title, value }) => (
            <SummaryCard key={title} title={title} value={value} />
          ))}
        </Box>

        <Typography variant="h5" color={theme.palette.primary.main} gutterBottom>
          {t('recent_activities')}
        </Typography>

        <Box
          sx={{
            maxHeight: "50vh",
            overflow: "auto",
          }}
        >
          <CustomList
            items={data}
            sx={{
              overflow: "auto",
              maxHeight: "50vh",
            }}
            onRemove={handleRemove}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
