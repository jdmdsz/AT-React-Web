import { Typography as MuiTypography } from '@mui/material';

const Typography = ({ variant = "body1", children, ...props }) => (
  <MuiTypography variant={variant} {...props}>
    {children}
  </MuiTypography>
);

export default Typography;
