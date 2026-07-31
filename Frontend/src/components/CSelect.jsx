import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

export default function CSelect({
  label,
  value,
  onChange,
  name,
  options = [],
  icon: Icon,
}) {
  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel>{label}</InputLabel>

      <Select
        value={value}
        label={label}
        name={name}
        onChange={onChange}
        input={
          <OutlinedInput
            label={label}
            startAdornment={
              Icon ? (
                <InputAdornment position="start">
                  <Icon sx={{ fontSize: 20, color: "#666" }} />
                </InputAdornment>
              ) : null
            }
          />
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
      >
        {options &&
          options.map((option) => (
            <MenuItem
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                py: 1.2,
                fontSize: "15px",
                transition: "all 0.2s",

                "&:hover": {
                  backgroundColor: "#4f46e5",
                  color: "#EEF2FF",
                },

                "&.Mui-selected": {
                  backgroundColor: "#4f46e5",
                  color: "#EEF2FF",
                  fontWeight: 600,
                },

                "&.Mui-selected:hover": {
                  backgroundColor: "#4f46e5",
                },
              }}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
