import { Alert as MuiAlert } from '@mui/material';

const Alert = ({ severity = 'info', children, ...props }) => {
  return (
    <MuiAlert severity={severity} {...props}>
      {children}
    </MuiAlert>
  );
};

export default Alert;
