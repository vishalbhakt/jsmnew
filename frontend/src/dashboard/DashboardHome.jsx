import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import StatCard from "../components/StatCard";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

const roleCopy = {
  admin: {
    title: "Academy Operations",
    description: "Monitor users, attendance, fees, CMS inquiries, and academic performance.",
  },
  teacher: {
    title: "Teacher Workspace",
    description: "Track assigned classes, attendance, assignments, notes, videos, and submissions.",
  },
  student: {
    title: "Student Portal",
    description: "Access notes, assignments, videos, attendance, results, payments, and notifications.",
  },
};

export default function DashboardHome() {
  const { user } = useAuth();
  const role = user?.role || "student";
  const content = roleCopy[role] || roleCopy.student;
  
  const [data, setData] = useState({
    stats: [],
    performance: [],
    today: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const response = await api.get("/dashboard/");
        if (active) {
          setData(response.data);
        }
      } catch (err) {
        console.error("Failed to load dashboard data");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    load();
    return () => { active = false; };
  }, []);

  return (
    <div>
      <div className="mb-6">
        <p className="section-kicker">Dashboard</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">{content.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{content.description}</p>
      </div>

      {loading ? (
        <div className="py-10 text-center text-slate-500 font-bold">Loading dashboard...</div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.stats.map((item) => (
              <StatCard key={item.label} {...item} />
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <section className="panel p-5">
              <div className="mb-4">
                <h2 className="text-xl font-black text-slate-950">Performance Trend</h2>
                <p className="mt-1 text-sm font-bold text-slate-500">Attendance, result, and fee signals</p>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.performance} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="attendance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0f766e" stopOpacity={0.34} />
                        <stop offset="95%" stopColor="#0f766e" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#e7eee9" strokeDasharray="4 4" />
                    <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="attendance" stroke="#0f766e" fill="url(#attendance)" strokeWidth={3} />
                    <Area type="monotone" dataKey="results" stroke="#b45309" fill="transparent" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="panel p-5">
              <h2 className="text-xl font-black text-slate-950">Today</h2>
              <div className="mt-4 grid gap-3">
                {data.today.map(([label, value], idx) => (
                  <div key={idx} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-black uppercase text-amber-700">{label}</p>
                    <p className="mt-1 text-sm font-bold text-slate-700">{value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
