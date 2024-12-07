import { Avatar as MuiAvatar } from '@mui/material';

const Avatar = ({ alt, src, ...props }) => {
  return <MuiAvatar alt={alt} src={src} {...props} />;
};

export default Avatar;
