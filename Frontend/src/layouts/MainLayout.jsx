import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const { loading } = useSelector((state) => state.auth.loading);
  return (
    <>
      {/* Navbar */}

      {/* Sidebar */}
      <main className="min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
