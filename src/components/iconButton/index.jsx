import { IconButton as MuiIconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const IconButton = ({ icon = <DeleteIcon />, ...props }) => (
  <MuiIconButton {...props}>
    {icon}
  </MuiIconButton>
);

export default IconButton;
