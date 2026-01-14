import React, { useContext, useState } from "react";
import Logo from "../elements/Logo";
import Input from "../elements/Input";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Icon from "../elements/Icon";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import { AuthContext } from "../../context/authContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function MainLayout(props) {
  const { children } = props;
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const { theme, setTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const themes = [
    { name: "theme-green", bgcolor: "bg-[#299D91]", color: "#299D91" },
    { name: "theme-blue", bgcolor: "bg-[#1E90FF]", color: "#1E90FF" },
    { name: "theme-purple", bgcolor: "bg-[#6A5ACD]", color: "#6A5ACD" },
    { name: "theme-pink", bgcolor: "bg-[#DB7093]", color: "#DB7093" },
    { name: "theme-brown", bgcolor: "bg-[#8B4513]", color: "#8B4513" },
  ];

  const menu = [
    { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
    { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
    { id: 3, name: "Transaction", icon: <Icon.Transaction />, link: "/transaction" },
    { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
    { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expenses" },
    { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
    { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
  ];

  // ✅ LOGOUT + LOADING
  const handleLogout = (e) => {
    e.preventDefault();
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLoadingLogout(true);

    setTimeout(() => {
      logout();
      setIsLoggingOut(false);
      setLoadingLogout(false);
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <div className={`flex min-h-screen ${theme.name}`}>
        <aside className="bg-defaultBlack w-28 sm:w-64 text-special-bg2 flex flex-col justify-between px-4 sm:px-7 py-12">
          
          {/* 🔹 TOP */}
          <div>
            <div className="mb-10">
              <Logo variant="secondary" />
            </div>

            <nav>
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex px-4 py-3 rounded-md hover:text-white hover:font-bold hover:scale-105 ${
                      isActive
                        ? "bg-primary text-white font-bold"
                        : "hover:bg-special-bg3"
                    }`
                  }
                >
                  <div className="mx-auto sm:mx-0">{item.icon}</div>
                  <div className="ms-3 hidden sm:block">{item.name}</div>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* 🔹 THEME */}
          <div>
            <div className="text-xs text-gray-500 mb-3 hidden sm:block">
              Themes
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              {themes.map((t) => (
                <div
                  key={t.name}
                  className={`${t.bgcolor} w-6 h-6 rounded-md cursor-pointer hover:scale-110 transition-transform`}
                  onClick={() => setTheme(t)}
                />
              ))}
            </div>
          </div>

          {/* 🔹 LOGOUT + PROFILE */}
          <div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              type="button"
              className="w-full cursor-pointer group disabled:opacity-50"
            >
              <div className="flex bg-special-bg3 text-white px-4 py-3 rounded-md hover:bg-special-bg hover:scale-105 transition-all">
                <div className="mx-auto sm:mx-0 text-primary">
                  <Icon.Logout />
                </div>
                <div className="ms-3 hidden sm:block">
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </div>
              </div>
            </button>

            <div className="border-b my-10 border-special-bg"></div>

            {/* ✅ PROFIL */}
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0) || "U"}
              </div>

              <div className="hidden sm:block flex-1 ml-3">
                <div className="text-sm font-medium text-white">
                  {user?.name || "User"}
                </div>
                <div className="text-xs text-gray-400 cursor-pointer hover:text-primary">
                  View Profile
                </div>
              </div>

              <div className="hidden sm:block">
                <Icon.Detail size={15} />
              </div>
            </div>
          </div>
        </aside>

        {/* 🔹 CONTENT */}
        <div className="bg-special-mainBg flex-1 flex flex-col">
          <header className="border-b border-gray-05 px-6 py-7 flex justify-between items-center">
            <div className="flex items-center">
              <div className="font-bold text-2xl me-6">
                {user?.name || "User"}
              </div>
              <div className="text-gray-03 flex">
                <Icon.ChevronRight size={20} />
                <span>May 19, 2023</span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="me-10">
                <NotificationsIcon className="text-primary scale-110" />
              </div>
              <Input backgroundColor="bg-white" border="border-white" />
            </div>
          </header>

          <main className="flex-1 px-6 py-4">{children}</main>
        </div>
      </div>

      {/* 🔥 BACKDROP + LOADING BUNDAR */}
      <Backdrop
        open={loadingLogout}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 9999,
          backdropFilter: "blur(2px)",
        }}
      >
        <CircularProgress color="inherit" size={60} />
      </Backdrop>
    </>
  );
}

export default MainLayout;
