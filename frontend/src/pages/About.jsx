import PageHeader from "../components/PageHeader";

export default function About() {
  return (
    <section className="page-band">
      <div className="container-x">
        <PageHeader
          kicker="About"
          title="Academic discipline with digital visibility"
          description="JSM Shiksha Academy combines classroom teaching, structured assessments, parent communication, and role-based dashboards for daily school operations."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ["Mission", "Deliver clear, accountable, and student-centered education with measurable progress."],
            ["Teaching Model", "Blend teacher-led classes with notes, assignments, video lectures, tests, and regular feedback."],
            ["Operations", "Keep admissions, attendance, results, fees, notifications, and reports organized in one platform."],
          ].map(([title, body]) => (
            <article key={title} className="panel p-6">
              <h2 className="text-xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
