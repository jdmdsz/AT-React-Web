import { Card as MUICard, CardContent, Typography } from "@mui/material";

const Card = ({ title, content }) => {
  return (
    <MUICard>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </MUICard>
  );
};

export default Card;
