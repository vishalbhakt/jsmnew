import { GraduationCap, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/admission", label: "Admission" },
  { to: "/facilities", label: "Facilities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

function PublicNavLink({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-bold ${
          isActive ? "bg-emerald-50 text-emerald-800" : "text-slate-700 hover:bg-slate-100"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function PublicLayout() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/92 backdrop-blur">
        <div className="container-x flex min-h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 font-black text-slate-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-700 text-white">
              <GraduationCap size={22} />
            </span>
            <span className="leading-tight">
              JSM Shiksha
              <span className="block text-xs font-extrabold text-amber-700">Academy</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <PublicNavLink key={item.to} to={item.to}>
                {item.label}
              </PublicNavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="btn btn-primary">
              <LogIn size={18} />
              {isAuthenticated ? "Dashboard" : "Login"}
            </Link>
          </div>

          <button className="icon-btn lg:hidden" type="button" onClick={() => setOpen((value) => !value)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <div className="container-x grid gap-2 py-4">
              {navItems.map((item) => (
                <PublicNavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
                  {item.label}
                </PublicNavLink>
              ))}
              <Link to={isAuthenticated ? "/dashboard" : "/login"} className="btn btn-primary mt-2">
                <LogIn size={18} />
                {isAuthenticated ? "Dashboard" : "Login"}
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-slate-950 py-10 text-white">
        <div className="container-x grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 font-black">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                <GraduationCap size={22} />
              </span>
              JSM Shiksha Academy
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
              A school management platform for admissions, digital learning, attendance,
              results, fees, and communication.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase">Contact</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              admissions@jsmshikshaacademy.com
              <br />
              +91 90000 00000
            </p>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase">Portals</h3>
            <div className="mt-3 grid gap-2 text-sm text-slate-300">
              <Link to="/login">Student Login</Link>
              <Link to="/login">Teacher Login</Link>
              <Link to="/login">Admin Login</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
