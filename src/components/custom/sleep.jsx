import { Grid, DateTimePicker, TextField } from "../";
import { useAppContext } from '../../Context';
import { useTheme } from '@mui/material/styles';

const Sleep = ({ data, setData }) => {
  const { t } = useAppContext();
  const theme = useTheme();

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  return (
    <Grid container spacing={3} sx={{ padding: "16px" }} justifyContent="center">
      <Grid item xs={12}>
        <DateTimePicker
          label={t("start_time")}
          value={data.startTime || null}
          format="DD/MM/YYYY HH:mm"
          ampm={false}
          onChange={(value) => handleChange("startTime", value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <DateTimePicker
          label={t("end_time")}
          value={data.endTime || null}
          format="DD/MM/YYYY HH:mm"
          ampm={false}
          onChange={(value) => handleChange("endTime", value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={t("observation")}
          multiline
          fullWidth
          rows={4}
          value={data.observation || ""}
          onChange={(e) => handleChange("observation", e.target.value)}
          sx={{
            '& .MuiInputLabel-root.Mui-focused': { color: theme.palette.primary.main },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Sleep;
