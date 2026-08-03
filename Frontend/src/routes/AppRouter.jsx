import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PublicRoute from "./PublicRoute";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Dashboard from "../pages/Home/Dashboard";
import PostDetails from "../pages/Home/PostDetails";
import CreatePost from "../pages/Home/CreatePost";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import VerifyOtp from "../pages/Auth/VerifyOtp";
import ToastContainer from "../components/ToastContainer";
import GlobalLoader from "../components/GlobalLoader";
import UserProfile from "../pages/Profile/UserProfile";
import SearchResults from "../pages/Search/SearchResults";
import storage from "../utils/storage";
import AdminDashboard from "../pages/Profile/AdminDashboard";

export default function AppRouter() {
  const atoken = storage.getToken("accessToken");
  return (
    <BrowserRouter>
      <GlobalLoader />
      <ToastContainer />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path="/"
            element={atoken ? <Navigate to="/dashboard" replace /> : <Login />}
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <VerifyOtp />
              </PublicRoute>
            }
          />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post-details"
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          {/* Added the dynamic UserProfile route here */}
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Route>


        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
