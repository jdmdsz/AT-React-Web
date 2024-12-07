import { Checkbox as MUICheckbox, FormControlLabel } from "@mui/material";

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={
        <MUICheckbox
          checked={checked}
          onChange={onChange}
          color="primary"
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
