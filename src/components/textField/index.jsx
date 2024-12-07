import { TextField as MuiTextField } from '@mui/material';

const TextField = ({ label = "Text Field", ...props }) => (
  <MuiTextField label={label} variant="outlined" fullWidth {...props} />
);

export default TextField;
