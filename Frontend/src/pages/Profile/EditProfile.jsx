import React, { useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import {
  Alert,
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutDialog from "../Home/LogoutDialog";
import { logoutUser } from "../../redux/auth/authThunk";
import CTextField from "../../components/CTextField";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // NOTE: adjust these field names to match your actual auth slice shape.
  const { user } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const [username, setUsername] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.attachmentUrl || user?.profileImage || "",
  );
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message }
  const [openLogout, setOpenLogout] = useState(false);

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus({
        type: "error",
        message: "Please select a valid image file.",
      });
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const next = {};
    if (!username.trim()) next.username = "Username is required";
    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

//   const handleSave = () => {
//     setStatus(null);
//     if (!validate()) return;

//     // NOTE: swap this payload shape for whatever updateUserProfile expects.
//     // If the API needs multipart upload for the photo, build a FormData here:
//     //   const formData = new FormData();
//     //   formData.append("username", username);
//     //   formData.append("email", email);
//     //   if (avatarFile) formData.append("avatar", avatarFile);
//     const payload = {
//       username: username.trim(),
//       email: email.trim(),
//       avatarFile,
//     };

//     setSaving(true);
//     dispatch(updateUserProfile(payload))
//       .then((v) => {
//         if (v.meta.requestStatus === "fulfilled") {
//           setStatus({
//             type: "success",
//             message: "Profile updated successfully.",
//           });
//           setTimeout(() => navigate("/profile"), 900);
//         } else {
//           setStatus({
//             type: "error",
//             message:
//               v.payload?.message || "Couldn't update profile. Try again.",
//           });
//         }
//       })
//       .catch(() => {
//         setStatus({
//           type: "error",
//           message: "Couldn't update profile. Try again.",
//         });
//       })
//       .finally(() => setSaving(false));
//   };

  return (
    <>
      <Navbar onLogout={() => setOpenLogout(true)} />

      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 64px)",
          bgcolor: "#F8FAFC",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Sidebar mobile={false} onLogout={() => setOpenLogout(true)} />

        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            width: "100%",
            p: { xs: 2, sm: 3, md: 4 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LogoutDialog
            open={openLogout}
            onClose={() => setOpenLogout(false)}
            onLogout={() => {
              dispatch(logoutUser()).then((v) => {
                if (v.meta.requestStatus === "fulfilled") {
                  navigate("/", { replace: true });
                }
              });
            }}
          />

          <Box sx={{ width: "100%", maxWidth: 560 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                mb: { xs: 2, md: 3 },
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
              }}
            >
              Edit Profile
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3, md: 4 },
                borderRadius: 3,
                border: "1px solid #E5E7EB",
              }}
            >
              {status && (
                <Alert severity={status.type} sx={{ mb: 3 }}>
                  {status.message}
                </Alert>
              )}

              {/* Avatar */}
              <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                <Box sx={{ position: "relative", width: "fit-content" }}>
                  <Avatar
                    src={avatarPreview}
                    alt={username}
                    sx={{
                      width: { xs: 96, sm: 112 },
                      height: { xs: 96, sm: 112 },
                      fontSize: "2.25rem",
                      bgcolor: "primary.main",
                    }}
                  >
                    {username?.[0]?.toUpperCase()}
                  </Avatar>

                  <IconButton
                    onClick={handlePhotoClick}
                    size="small"
                    sx={{
                      position: "absolute",
                      bottom: -4,
                      right: -4,
                      bgcolor: "primary.main",
                      color: "#fff",
                      border: "2px solid #fff",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                  >
                    <PhotoCameraOutlinedIcon fontSize="small" />
                  </IconButton>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handlePhotoChange}
                  />
                </Box>
              </Box>

              {/* Fields */}
              <Stack spacing={3}>
                <CTextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={!!errors.username}
                  helperText={errors.username}
                  fullWidth
                />

                <CTextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                />
              </Stack>

              {/* Actions */}
              <Stack
                direction={{ xs: "column-reverse", sm: "row" }}
                spacing={1.5}
                justifyContent="flex-end"
                sx={{ mt: 4 }}
              >
                <Button
                  variant="outlined"
                  fullWidth={false}
                  onClick={() => navigate("/profile")}
                  disabled={saving}
                  sx={{
                    borderRadius: 5,
                    px: 3,
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  onClick={()=>{}}
                  disabled={saving}
                  sx={{
                    borderRadius: 5,
                    px: 4,
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default EditProfile;
