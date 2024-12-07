import { AppBar as MuiAppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

const AppBar = ({ title, showBackButton, onDelete }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <MuiAppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Toolbar>
        {showBackButton && (
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {onDelete && (
          <IconButton edge="end" color="inherit" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
