import { signOut } from "firebase/auth";
import {
  BriefcaseBusiness,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Sun,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { toast } from "./toast.jsx";

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
  }`;

const Navbar = ({ user, userRole, darkMode, setDarkMode }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!auth) {
      toast.error("Add Firebase config to enable authentication");
      return;
    }
    await signOut(auth);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const dashboardLink = userRole === "admin" ? "/admin" : "/dashboard";

  const links = (
    <>
      <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
        Home
      </NavLink>
      <NavLink to="/jobs" className={linkClass} onClick={() => setOpen(false)}>
        Jobs
      </NavLink>
      {user && (
        <NavLink
          to={dashboardLink}
          className={linkClass}
          onClick={() => setOpen(false)}
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-600 text-white">
            <BriefcaseBusiness className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold text-slate-950 dark:text-white">
            HireHub
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">{links}</div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            className="btn-secondary h-10 w-10 px-0"
            aria-label="Toggle theme"
            title="Toggle theme"
            onClick={() => setDarkMode((value) => !value)}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {user ? (
            <>
              <Link to={dashboardLink} className="btn-secondary">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-primary">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                <UserPlus className="h-4 w-4" />
                Signup
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            className="btn-secondary h-10 w-10 px-0"
            aria-label="Toggle theme"
            onClick={() => setDarkMode((value) => !value)}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            className="btn-secondary h-10 w-10 px-0"
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col gap-2">{links}</div>
          <div className="mt-4 grid gap-2">
            {user ? (
              <button onClick={handleLogout} className="btn-primary">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn-secondary" onClick={() => setOpen(false)}>
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link to="/signup" className="btn-primary" onClick={() => setOpen(false)}>
                  <UserPlus className="h-4 w-4" />
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
