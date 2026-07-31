import { Link, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import AuthPageLayout from "../../components/AuthpageLayout";
import CTextField from "../../components/CTextField";
import CPasswordField from "../../components/CPasswordField";
import CButton from "../../components/CButton";
import { EmailOutlined } from "@mui/icons-material";
import { ENDPOINTS, http } from "../../api/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChangeField } from "../../redux/auth/authSlice";
import CCheckbox from "../../components/CCheckbox";
import { loginUser } from "../../redux/auth/authThunk";
import toast from "../../utils/toast";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <AuthPageLayout
        title="Welcome Back"
        subtitle="Sign in to continue to PromptLab AI"
        leftTitle="Discover, Save and Organize the Best AI Prompts"
      >
        <Box component="form">
          <CTextField
            label="Email"
            placeholder="example@gmail.com"
            icon={EmailOutlined}
            name="email"
            onChange={(v) => {
              dispatch(
                onChangeField({
                  field: "user",
                  value: { ...user, email: v.target.value },
                }),
              );
            }}
          />

          <CPasswordField
            label="Password"
            name="password"
            placeholder="Enter your password"
            onChange={(v) => {
              dispatch(
                onChangeField({
                  field: "user",
                  value: { ...user, password1: v.target.value },
                }),
              );
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 3,
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                color: "#4f46e5",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <CButton
            // type="submit"
            onClick={async () => {
              await dispatch(
                loginUser({ email: user.email, password: user.password1 }),
              ).then((v) => {
                if (v.meta.requestStatus == "fulfilled") {
                  // toast.success()
                  navigate("/dashboard");
                }
              });
            }}
          >
            Sign In
          </CButton>
          <CCheckbox
            label="Remember me"
            name="rememberMe"
            checked={user.rememberMe}
            onChange={(e) =>
              dispatch(
                onChangeField({
                  field: "user",
                  value: { ...user, rememberMe: !user.rememberMe },
                }),
              )
            }
          />
          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
              color: "#666",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#4f46e5",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Create Account
            </Link>
          </Typography>
        </Box>
      </AuthPageLayout>
    </>
  );
}
