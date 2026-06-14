import {
  Bell,
  BookOpen,
  ClipboardCheck,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  PlaySquare,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const navByRole = {
  student: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/dashboard/notes", label: "Notes", icon: FileText },
    { to: "/dashboard/assignments", label: "Assignments", icon: BookOpen },
    { to: "/dashboard/videos", label: "Videos", icon: PlaySquare },
    { to: "/dashboard/attendance", label: "Attendance", icon: ClipboardCheck },
    { to: "/dashboard/results", label: "Results", icon: Bell },
    { to: "/dashboard/payments", label: "Payments", icon: CreditCard },
    { to: "/dashboard/announcements", label: "Announcements", icon: Bell },
    { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
    { to: "/dashboard/profile", label: "My Profile", icon: Settings },
  ],
  teacher: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/dashboard/students", label: "Students", icon: Users },
    { to: "/dashboard/attendance", label: "Attendance", icon: ClipboardCheck },
    { to: "/dashboard/assignments", label: "Assignments", icon: BookOpen },
    { to: "/dashboard/notes", label: "Notes", icon: FileText },
    { to: "/dashboard/videos", label: "Videos", icon: PlaySquare },
    { to: "/dashboard/results", label: "Results", icon: Bell },
    { to: "/dashboard/announcements", label: "Announcements", icon: Bell },
    { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
    { to: "/dashboard/profile", label: "My Profile", icon: Settings },
  ],
  admin: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/dashboard/users", label: "Users", icon: Users },
    { to: "/dashboard/students", label: "Students", icon: Users },
    { to: "/dashboard/teachers", label: "Teachers", icon: Users },
    { to: "/dashboard/classes", label: "Classes", icon: BookOpen },
    { to: "/dashboard/subjects", label: "Subjects", icon: BookOpen },
    { to: "/dashboard/assessments", label: "Assessments", icon: BookOpen },
    { to: "/dashboard/attendance-sessions", label: "Att. Sessions", icon: ClipboardCheck },
    { to: "/dashboard/attendance", label: "Att. Records", icon: ClipboardCheck },
    { to: "/dashboard/assignments", label: "Assignments", icon: BookOpen },
    { to: "/dashboard/submissions", label: "Submissions", icon: BookOpen },
    { to: "/dashboard/notes", label: "Notes", icon: FileText },
    { to: "/dashboard/videos", label: "Videos", icon: PlaySquare },
    { to: "/dashboard/quizzes", label: "Quizzes", icon: PlaySquare },
    { to: "/dashboard/results", label: "Results", icon: Bell },
    { to: "/dashboard/fees", label: "Fee Plans", icon: CreditCard },
    { to: "/dashboard/payments", label: "Payments", icon: CreditCard },
    { to: "/dashboard/announcements", label: "Announcements", icon: Bell },
    { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
    { to: "/dashboard/activity-logs", label: "Activity Logs", icon: Settings },
    { to: "/dashboard/pages", label: "Pages", icon: FileText },
    { to: "/dashboard/cms-courses", label: "Courses", icon: Settings },
    { to: "/dashboard/cms-facilities", label: "Facilities", icon: Settings },
    { to: "/dashboard/gallery", label: "Gallery", icon: Settings },
    { to: "/dashboard/contact-messages", label: "Contact Msg", icon: Settings },
    { to: "/dashboard/cms", label: "Inquiries", icon: Settings },
    { to: "/dashboard/reports", label: "Reports", icon: ClipboardCheck },
  ],
};

function DashboardNav({ items, onNavigate }) {
  return (
    <nav className="grid gap-1">
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-bold ${
              isActive ? "bg-emerald-700 text-white" : "text-slate-700 hover:bg-emerald-50"
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const role = user?.role || "student";
  const navItems = navByRole[role] || navByRole.student;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white lg:hidden">
        <div className="flex min-h-16 items-center justify-between px-4">
          <button className="icon-btn" type="button" onClick={() => setOpen((value) => !value)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/dashboard" className="font-black text-slate-900">
            JSM Portal
          </Link>
          <button className="icon-btn" type="button" onClick={handleLogout}>
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[280px_1fr]">
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-slate-200 bg-white p-5 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="font-black leading-tight text-slate-900">
              JSM Shiksha
              <span className="block text-xs text-amber-700">Academy Portal</span>
            </Link>
            <button className="icon-btn lg:hidden" type="button" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="my-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-black text-slate-900">{user?.full_name || user?.username}</p>
            <p className="mt-1 text-xs font-bold uppercase text-emerald-700">{role}</p>
          </div>

          <DashboardNav items={navItems} onNavigate={() => setOpen(false)} />

          <button className="btn btn-secondary mt-8 w-full" type="button" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </aside>

        <main className="min-w-0 px-4 py-6 md:px-8 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
