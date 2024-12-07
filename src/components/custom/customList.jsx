import React, { useState, useEffect, useRef } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CribIcon from '@mui/icons-material/Crib';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppContext } from '../../Context';
import { useTheme } from '@mui/material/styles';

const CustomList = ({ items, style, onRemove }) => {
  const navigate = useNavigate();
  const { t } = useAppContext();
  const theme = useTheme();
  const [visibleItems, setVisibleItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const loadCount = 10;
  const listInnerRef = useRef();

  useEffect(() => {
    const sortedItems = [...items].reverse();
    setVisibleItems(sortedItems.slice(0, loadCount));
    setHasMore(sortedItems.length > loadCount);
  }, [items]);

  const handleScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore) {
        loadMoreItems();
      }
    }
  };

  const loadMoreItems = () => {
    const currentLength = visibleItems.length;
    const sortedItems = [...items].reverse();
    const nextResults = sortedItems.slice(currentLength, currentLength + loadCount);
    setVisibleItems([...visibleItems, ...nextResults]);
    setHasMore(sortedItems.length > visibleItems.length + nextResults.length);
  };

  const actionTypes = {
    "1": { icon: <CribIcon />, title: t("sleep") },
    "2": { icon: <RestaurantMenuIcon />, title: t("feeding") },
    "3": { icon: <BabyChangingStationIcon />, title: t("diaper_change") },
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return t("not_available");
    return new Intl.DateTimeFormat(t("locale"), {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    }).format(new Date(dateTime));
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return t("not_available");
    const diffMinutes = Math.round((new Date(end) - new Date(start)) / 60000);
    return `${diffMinutes} ${t("minutes")}`;
  };

  const renderItemDetails = (item) => (
    <Box>
      {item.startTime && (
        <Typography variant="body2">
          <strong>{t("start_time")}:</strong> {formatDateTime(item.startTime)}
        </Typography>
      )}
      {item.endTime && (
        <Typography variant="body2">
          <strong>{t("duration")}:</strong> {calculateDuration(item.startTime, item.endTime)}
        </Typography>
      )}
      {item.time && (
        <Typography variant="body2">
          <strong>{t("change_time")}:</strong> {formatDateTime(item.time)}
        </Typography>
      )}
      {item.type && (
        <Typography variant="body2">
          <strong>{t("type")}:</strong> {t(item.type) || t("not_available")}
        </Typography>
      )}
      {item.observation && (
        <Typography variant="body2">
          <strong>{t("observation")}:</strong> {item.observation}
        </Typography>
      )}
    </Box>
  );

  return (
    <List style={{ ...style, overflow: 'auto' }} onScroll={handleScroll} ref={listInnerRef}>
      {visibleItems.map((item) => (
        <ListItem
          key={item.id}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
            mb: 1,
            cursor: 'pointer',
            boxShadow: 1,
          }}
          onClick={() => navigate(`/new/${item.action_type}/${item.id}`)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              {actionTypes[item.action_type]?.icon || <RestaurantMenuIcon />}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                {actionTypes[item.action_type]?.title || t("unknown")}
              </Typography>
            }
            secondary={renderItemDetails(item)}
            sx={{ mr: 'auto', color: theme.palette.text.secondary }}
          />
          <IconButton
            edge="end"
            aria-label={t("remove")}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
            sx={{ color: theme.palette.primary.main }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
      {hasMore && (
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                {t("loading_more")}
              </Typography>
            }
          />
        </ListItem>
      )}
    </List>
  );
};

export default CustomList;
