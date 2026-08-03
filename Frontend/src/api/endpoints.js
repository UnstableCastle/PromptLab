const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    FORGOTPASSOTP: "/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",
    RESETPASSWORD: "/auth/reset-password",
  },
  POSTS: {
    CREATE: "/posts/init",
    SUBMIT: (id) => `/posts/${id}/submit`,
    GETALL: "/posts/feed",
    GETBYID: "/posts/detail",
    POSTBYUSERID: (id) => `/posts/user/${id}/portfolio`,
    POSTBYUSERNAME: "/users/username/",
    DELETEPOST: (id) => `/posts/delete/${id}`,
    TOGGLE_UPVOTE: (id) => `/posts/detail/${id}/upvote`,
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
  },
  USERS: {
    GET_ALL: "users",
    FOLLOW: (targetUserId) => `/users/${targetUserId}/follow`,
    UNFOLLOW: (targetUserId) => `/users/${targetUserId}/unfollow`,
  },
};

export default ENDPOINTS;