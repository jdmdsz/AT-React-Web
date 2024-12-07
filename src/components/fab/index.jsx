import { Fab as MuiFab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Fab = ({ icon = <AddIcon />, ...props }) => (
  <MuiFab {...props}>
    {icon}
  </MuiFab>
);

export default Fab;
