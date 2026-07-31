import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

export default function CTextField({
  label,
  placeholder,
  icon: Icon,
  value,
  onChange,
  name,
  type = "text",
}) {
  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel>{label}</InputLabel>

      <OutlinedInput
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        startAdornment={
          Icon ? (
            <InputAdornment position="start">
              <Icon sx={{ fontSize: 20, color: "#666" }} />
            </InputAdornment>
          ) : null
        }
        sx={{
          borderRadius: 3,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#C7C4D8",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4f46e5",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4f46e5",
            borderWidth: 2,
          },
        }}
      />
    </FormControl>
  );
}
