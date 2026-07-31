import { EmailOutlined, Person, Person2Outlined } from "@mui/icons-material";
import AuthPageLayout from "../../components/AuthpageLayout";
import CButton from "../../components/CButton";
import CPasswordField from "../../components/CPasswordField";
import CSelect from "../../components/CSelect";
import CTextField from "../../components/CTextField";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onChangeField } from "../../redux/auth/authSlice";
import { ENDPOINTS, http } from "../../api/index";
import { registerUser } from "../../redux/auth/authThunk";
import { showLoader } from "../../redux/loaderSlice";

export default function Register() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = async () => {
    const params = {
      email: user.email,
      username: user.name,
      password: user.password2,
    };
    await dispatch(showLoader());
    await dispatch(registerUser(params)).then((v) => {
      if (v.meta.requestStatus === "fulfilled") {
        navigate("/", { replace: true });
      }
    });
  };

  return (
    <AuthPageLayout
      title="Create Account"
      subtitle="Sign up to start your pro workspace"
    >
      <Box component="form">
        <CTextField
          placeholder="John Doe"
          icon={Person2Outlined}
          name="name"
          label="Name"
          onChange={(v) => {
            dispatch(
              onChangeField({
                field: "user",
                value: { ...user, name: v.target.value },
              }),
            );
          }}
        />
        <CTextField
          placeholder="example@gmail.com"
          icon={EmailOutlined}
          name="email"
          label="Email"
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
          name="password"
          placeholder="Enter your password"
          label="Password"
          onChange={(v) => {
            dispatch(
              onChangeField({
                field: "user",
                value: { ...user, password1: v.target.value },
              }),
            );
          }}
        />
        <CPasswordField
          name="confpassword"
          placeholder="Confirm password"
          label="Confirm Password"
          onChange={(v) => {
            dispatch(
              onChangeField({
                field: "user",
                value: { ...user, password2: v.target.value },
              }),
            );
          }}
        />
        {/* <CSelect
          label="Role"
          value={role}
          name="role"
          onChange={(e) => setRole(e.target.value)}
          options={roleOptions}
        /> */}
        <CButton
          onClick={() => {
            handleRegister();
          }}
        >
          Register
        </CButton>
        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            color: "#666",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#4f46e5",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </AuthPageLayout>
  );
}
