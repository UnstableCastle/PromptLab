// src/api/endpoints.js

const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    FORGOTPASSOTP :"/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",           
    RESETPASSWORD: "/auth/reset-password", 
   TOGGLE_UPVOTE: (id) => `/posts/detail/${id}/upvote`,
  },

  POSTS: {
    CREATE: "/posts",
    GETALL: "/posts/feed",
    GETBYID: "/posts/detail",
    POSTBYUSERID: (id) => `/posts/user/${id}/portfolio`,
    POSTBYUSERNAME: "/users/username/",
    DELETEPOST: "",
  },
  ADMIN:{
    DASHBOARD : "/admin/dashboard",
    USERS : "/admin/users"
  },

  USERS: {
    GET_ALL:"users",
  },
};

export default ENDPOINTS;