import { Link, useNavigate } from "react-router-dom";
import SideBarNavigation from "./SideBarNavigation";
import toast from "react-hot-toast";

const SideBar = () => {
  const userData = JSON.parse(window.localStorage.getItem("userData") || "{}");
  const token = window.sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("userData");
    window.sessionStorage.removeItem("accessToken");

    toast.success("Logged out successfully!");

    navigate("/login");
  };
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex fixed left-0 top-0 h-screen w-64 border-r border-white/20
        bg-gradient-to-b from-[#fff7f6] via-[#fdeceb] to-[#f9d8d6]
        shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl"
      >
        <div className="flex h-full flex-col p-6 w-full">
          {/* Logo */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-tight text-[#4f4444]">
              insta
            </h1>
            <p className="mt-1 text-sm text-[#7c6d6b]">Connect with everyone</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <SideBarNavigation />
          </nav>

          {/* User Card */}
          <div className="mt-auto rounded-3xl border border-white/40 bg-white/50 p-4 backdrop-blur-lg shadow-lg">
            {token && userData?.name ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full
                  bg-gradient-to-br from-[#f9d8d6] to-[#f3b8b4]
                  font-semibold text-[#6d5654]"
                  >
                    {userData.name[0].toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-[#4f4444]">
                      {userData.name}
                    </h3>

                    <p className="truncate text-sm text-[#8a7775]">
                      @{userData.name}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="rounded-xl px-3 py-2 text-sm font-semibold
                text-red-500 transition hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="text-center font-semibold">
                <Link to="/login">Login</Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navbar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50
        border-t border-white/30 bg-white/80 backdrop-blur-xl
        shadow-[0_-5px_20px_rgba(0,0,0,0.08)]"
      >
        <div className="flex items-center justify-around px-2 py-3">
          <SideBarNavigation />
        </div>
      </nav>
    </>
  );
};

export default SideBar;
