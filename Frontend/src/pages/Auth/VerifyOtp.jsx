import { EmailOutlined } from "@mui/icons-material";
import AuthPageLayout from "../../components/AuthpageLayout";
import CButton from "../../components/CButton";
import CTextField from "../../components/CTextField";
import { MuiOtpInput } from "mui-one-time-password-input";
import CPasswordField from "../../components/CPasswordField";
import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import your thunks here! Adjust the path if necessary.
import { resetPassword, forgotPassSendOtp } from "../../redux/auth/authThunk"; 

const RESEND_SECONDS = 30;

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const maskedEmail = email
    ? email.replace(/^(.{2}).+(@.+)$/, "$1***$2")
    : "your email";

  const handleChange = (value) => {
    setOtp(value);
    if (error) setError("");
  };

  const handleVerify = async () => {
    let hasError = false;

    if (otp.length < 6) {
      setError("Enter the complete 6-digit code.");
      hasError = true;
    } else {
      setError("");
    }

    if (!password || password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    setVerifying(true);
    
    // Dispatch with the exact keys the backend expects
    const resultAction = await dispatch(
      resetPassword({ 
        email: email, 
        otp: otp, 
        newPassword: password // Maps to your backend DTO
      })
    );

    // If the API returns 200 OK, redirect the user to login
    if (resetPassword.fulfilled.match(resultAction)) {
      navigate("/"); 
    }
    
    setVerifying(false);
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    
    // Dispatch the existing forgot pass thunk to resend the OTP
    dispatch(forgotPassSendOtp({ email }));
    setSecondsLeft(RESEND_SECONDS);
  };

  return (
    <AuthPageLayout>
      <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4 } }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            bgcolor: "primary.50",
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2.5,
          }}
        >
          <EmailOutlined fontSize="medium" />
        </Box>

        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ fontSize: { xs: "1.35rem", sm: "1.5rem" } }}
        >
          Verify your email
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mt: 1, px: { xs: 1, sm: 0 } }}
        >
          We've sent a 6-digit verification code to{" "}
          <Typography
            component="span"
            variant="body2"
            fontWeight={600}
            sx={{ color: "text.primary" }}
          >
            {maskedEmail}
          </Typography>
          . Enter it below to continue.
        </Typography>
      </Box>

      <CTextField
        label="Email"
        value={email}
        disabled
        fullWidth
        sx={{ mb: { xs: 2.5, sm: 3 } }}
      />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <MuiOtpInput
          value={otp}
          sx={{
            gap: { xs: 1.25, sm: 2 },
            maxWidth: 360,

            "& .MuiOutlinedInput-root": {
              width: { xs: 48, sm: 60 },
              height: { xs: 54, sm: 65 },
              borderRadius: 2,
              fontSize: { xs: "22px", sm: "28px" },
              fontWeight: 700,
            },

            "& .MuiOutlinedInput-input": {
              textAlign: "center",
              padding: 0,
              fontSize: { xs: "22px", sm: "28px" },
              fontWeight: 700,
            },

            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: 2,
              borderColor: error ? "error.main" : undefined,
            },

            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderWidth: 2,
              },
          }}
          length={6}
          autoFocus
          onChange={handleChange}
        />
      </Box>

      {error && (
        <Typography
          variant="caption"
          sx={{
            color: "error.main",
            display: "block",
            textAlign: "center",
            mt: 1.5,
          }}
        >
          {error}
        </Typography>
      )}

      <Box sx={{ margin: { xs: 3, sm: 4 } }} />

      <CPasswordField
        label="New Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (passwordError) setPasswordError("");
        }}
        error={!!passwordError}
        helperText={passwordError}
        fullWidth
        sx={{ mb: { xs: 3, sm: 4 } }}
      />

      <CButton onClick={handleVerify} disabled={verifying}>
        {verifying ? "Verifying..." : "Verify Code"}
      </CButton>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0.5}
        sx={{ mt: 3 }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Didn't receive the code?
        </Typography>

        <Typography
          variant="body2"
          onClick={handleResend}
          sx={{
            fontWeight: 600,
            color: secondsLeft > 0 ? "text.disabled" : "primary.main",
            cursor: secondsLeft > 0 ? "default" : "pointer",
            "&:hover": secondsLeft > 0 ? {} : { textDecoration: "underline" },
          }}
        >
          {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : "Resend"}
        </Typography>
      </Stack>
    </AuthPageLayout>
  );
}

export default VerifyOtp;