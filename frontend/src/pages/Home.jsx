import { ArrowRight, BarChart3, BookOpenCheck, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "../assets/academy-hero.png";
import { facilities, publicCourses } from "../utils/fixtures";

const highlights = [
  { label: "Role-Based Portals", icon: Users },
  { label: "Digital Learning", icon: BookOpenCheck },
  { label: "Analytics & Reports", icon: BarChart3 },
  { label: "Secure Access", icon: ShieldCheck },
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-[76vh] overflow-hidden bg-slate-950 text-white">
        <img
          src={heroImage}
          alt="Modern classroom at JSM Shiksha Academy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/82 via-slate-950/54 to-slate-950/12" />
        <div className="container-x relative flex min-h-[76vh] items-center py-16">
          <div className="max-w-2xl">
            <p className="section-kicker text-amber-300">Admissions and digital school management</p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              JSM Shiksha Academy
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-100">
              A modern school platform for classroom learning, student progress, teacher workflows,
              fee tracking, and parent communication.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/admission" className="btn btn-primary">
                Admission Inquiry
                <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn border border-white/35 bg-white/12 text-white hover:bg-white/18">
                Open Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-5">
        <div className="container-x grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-lg border border-slate-200 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <Icon size={20} />
              </span>
              <span className="text-sm font-black text-slate-800">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-band">
        <div className="container-x">
          <div className="mb-8 max-w-3xl">
            <p className="section-kicker">Academic programs</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Structured learning for every stage</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {publicCourses.map((course) => (
              <article key={course.id} className="panel p-6">
                <p className="text-sm font-black text-amber-700">{course.grade_range}</p>
                <h3 className="mt-3 text-xl font-black text-slate-950">{course.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{course.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-band bg-white">
        <div className="container-x grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-kicker">Why JSM</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">A connected academy workflow</h2>
            <p className="mt-4 text-slate-600">
              The platform joins admission inquiries, learning resources, attendance, assignments,
              results, payments, notifications, and analytics into one secure system.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {facilities.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
