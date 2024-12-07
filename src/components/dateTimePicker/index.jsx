import { LocalizationProvider, DateTimePicker as MUIDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";

const DateTimePicker = ({ label, value, onChange, sx, ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDateTimePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} fullWidth sx={sx} />}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
