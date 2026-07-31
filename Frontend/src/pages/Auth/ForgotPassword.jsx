import React from "react";
import AuthPageLayout from "../../components/AuthpageLayout";
import CTextField from "../../components/CTextField";
import { Email, EmailOutlined } from "@mui/icons-material";
import CButton from "../../components/CButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onChangeField } from "../../redux/auth/authSlice";
import { forgotPassSendOtp } from "../../redux/auth/authThunk";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  return (
    <AuthPageLayout>
      <CTextField
        value={user.email}
        icon={EmailOutlined}
        label="Enter registered email"
        placeholder="Enter registered email"
        onChange={(v) => {
          dispatch(
            onChangeField({
              field: "user",
              value: { ...user, email: v.target.value },
            }),
          );
        }}
      />
      <CButton
        onClick={() => {
          dispatch(forgotPassSendOtp({ email: user.email })).then((v) => {
            if (v.meta.requestStatus === "fulfilled") {
              navigate("/reset-password", { state: { email: user.email } });
            }
          });
        }}
      >
        Send Code
      </CButton>
    </AuthPageLayout>
  );
}
