import { Grid, Button, TextField, DateTimePicker } from "../";
import { useAppContext } from '../../Context';
import { useTheme } from '@mui/material/styles';

const Diaper = ({ data, setData }) => {
  const { t } = useAppContext();
  const theme = useTheme();

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const buttonStyle = (isSelected) => ({
    minWidth: "120px",
    margin: "8px",
    backgroundColor: isSelected ? theme.palette.primary.light : theme.palette.primary.main,
    color: isSelected ? theme.palette.primary.main : theme.palette.primary.contrastText,
  });

  return (
    <Grid container spacing={3} sx={{ padding: "16px" }}>
      <Grid item xs={12} container spacing={2} justifyContent="start">
        {["urine_dirty", "feces_dirty", "both", "clean"].map((type) => (
          <Button
            key={type}
            variant="contained"
            onClick={() => handleChange("type", type)}
            sx={buttonStyle(data.type === type)}
          >
            {t(type)}
          </Button>
        ))}
      </Grid>
      <Grid item xs={12}>
        <DateTimePicker
          label={t("change_time")}
          value={data.time || null}
          onChange={(value) => handleChange("time", value)}
          fullWidth
          format="DD/MM/YYYY HH:mm"
          ampm={false}
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

export default Diaper;
