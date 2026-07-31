import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlined from "@mui/icons-material/LockOutlined";

export default function CPasswordField({
  label = "Password",
  placeholder="",
  value,
  onChange,
  name,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel>{label}</InputLabel>

      <OutlinedInput
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        label={label}
        type={showPassword ? "text" : "password"}
        startAdornment={
          <InputAdornment position="start">
            <LockOutlined fontSize="small" />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
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