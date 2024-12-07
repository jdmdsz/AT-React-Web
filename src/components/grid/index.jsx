import { Grid as MuiGrid } from '@mui/material';

const Grid = ({ children, ...props }) => (
  <MuiGrid container spacing={2} {...props}>
    {children}
  </MuiGrid>
);

export default Grid;
