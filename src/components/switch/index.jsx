import { Switch as MuiSwitch, FormControlLabel } from '@mui/material';

const Switch = ({ label = "", checked, onChange, ...props }) => (
  <FormControlLabel
    control={<MuiSwitch checked={checked} onChange={onChange} {...props} />}
    label={label}
  />
);

export default Switch;
