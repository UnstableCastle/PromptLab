import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const CCheckbox = ({
  label,
  checked,
  onChange,
  name,
  disabled = false,
  color = "#4f46e5",
  size = "medium",
  sx = {},
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          size={size}
          sx={{
            color: "#C7C4D8",
            "&.Mui-checked": {
              color,
            },
            ...sx,
          }}
        />
      }
      label={label}
    />
  );
};

export default CCheckbox;