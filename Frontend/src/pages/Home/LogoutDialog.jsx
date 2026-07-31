import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const LogoutDialog = ({ open, onClose, onLogout }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle>
        <Stack
          sx={{
            alignItems: "center",
            direction: "row",
            spacing: 1.5,
          }}
        >
          <WarningAmberRoundedIcon color="warning" fontSize="large" />

          <Typography variant="h6" fontWeight={700}>
            Logout
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Typography color="text.secondary">
          Are you sure you want to logout?
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={1}>
          You will need to sign in again to access your account.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
          gap: 1,
        }}
      >
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutOutlinedIcon />}
          onClick={onLogout}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
