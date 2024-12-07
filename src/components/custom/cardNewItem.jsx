import { Card, Fab, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context';
import { useTheme } from '@mui/material/styles';

const CardNewItem = ({ Icon, title, actionType }) => {
  const navigate = useNavigate();
  const { t } = useAppContext();
  const theme = useTheme();

  return (
    <Card
      sx={{
        overflow: 'visible',
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        boxShadow: 4,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
      }}
    >
      <Grid container direction="column" alignItems="center" spacing={1} sx={{ p: 2 }}>
        <Grid item>
          <Icon sx={{ fontSize: '3.5em', color: theme.palette.primary.main, mb: 1 }} />
        </Grid>
        <Grid item>
          <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
            {t(title)}
          </Typography>
        </Grid>
        <Grid item>
          <Fab
            size="medium"
            color="primary"
            onClick={() => navigate(`/new/${actionType}`)}
            aria-label={t('add')}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardNewItem;
