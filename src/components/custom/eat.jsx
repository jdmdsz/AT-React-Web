import { Grid, Button, TextField, DateTimePicker } from "../";
import { useAppContext } from '../../Context';
import { useTheme } from '@mui/material/styles';

const Eat = ({ data, setData }) => {
  const { t } = useAppContext();
  const theme = useTheme();

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const buttonStyle = (isSelected) => ({
    minWidth: "120px",
    margin: "4px",
    padding: "10px 16px",
    backgroundColor: isSelected ? theme.palette.primary.light : theme.palette.primary.main,
    color: isSelected ? theme.palette.primary.main : theme.palette.primary.contrastText,
  });

  return (
    <Grid container spacing={3} sx={{ padding: "16px" }}>
      <Grid item xs={12} container spacing={2} justifyContent="start">
        <Button
          variant="contained"
          onClick={() => handleChange("type", "bottle")}
          sx={buttonStyle(data.type === "bottle")}
        >
          {t("bottle")}
        </Button>
        <Button
          variant="contained"
          onClick={() => handleChange("type", "breast")}
          sx={buttonStyle(data.type === "breast")}
        >
          {t("breast")}
        </Button>
      </Grid>

      {data.type === "bottle" && (
        <Grid item xs={12}>
          <TextField
            label={t("quantity_ml")}
            type="number"
            fullWidth
            value={data.quantity || ""}
            onChange={(e) => handleChange("quantity", e.target.value)}
            sx={{
              '& .MuiInputLabel-root.Mui-focused': { color: theme.palette.primary.main },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            }}
          />
        </Grid>
      )}

      {data.type === "breast" && (
        <Grid item xs={12} container spacing={2} justifyContent="start">
          {["right", "left", "both"].map((side) => (
            <Button
              key={side}
              variant="contained"
              onClick={() => handleChange("side", side)}
              sx={buttonStyle(data.side === side)}
            >
              {t(side)}
            </Button>
          ))}
        </Grid>
      )}

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

export default Eat;
