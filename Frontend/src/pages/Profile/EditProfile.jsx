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
  Typography,
} from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutDialog from "../Home/LogoutDialog";
import { logoutUser } from "../../redux/auth/authThunk";
import CTextField from "../../components/CTextField";
import axios from "axios";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);

  const [username, setUsername] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const IMG_BASE_URL = import.meta.env.VITE_IMAGE_URL;

  // Format preview URL correctly if stored locally relative to server
  const [avatarPreview, setAvatarPreview] = useState(
    user?.profilePicture
      ? user.profilePicture.startsWith("http")
        ? user.profilePicture
        : `${IMAGE_BASE_URL}${user.profilePicture}`
      : "",
  );

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

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

  const handleSave = async () => {
    setStatus(null);
    if (!validate()) return;
    if (!user?.id) {
      setStatus({
        type: "error",
        message: "User session ID missing. Please log in again.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("username", username.trim());
    formData.append("email", email.trim());
    formData.append("bio", bio.trim());
    if (avatarFile) {
      formData.append("profilePicture", avatarFile);
    }

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("token");

    setSaving(true);
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const response = await axios.put(
        `${baseUrl}/users/${user.id}`,
        formData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        setStatus({
          type: "success",
          message: "Profile updated successfully.",
        });
        setTimeout(() => navigate("/profile"), 900);
      } else {
        setStatus({
          type: "error",
          message:
            response.data?.message || "Couldn't update profile. Try again.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.response?.data?.message || "Couldn't update profile. Try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 64px)",
          bgcolor: "#F8FAFC",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
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

                <CTextField
                  label="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  multiline
                  rows={3}
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
                  onClick={handleSave}
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
