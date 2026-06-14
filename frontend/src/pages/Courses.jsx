import PageHeader from "../components/PageHeader";
import { useResource } from "../hooks/useResource";

export default function Courses() {
  const { rows } = useResource("/courses/");

  return (
    <section className="page-band">
      <div className="container-x">
        <PageHeader
          kicker="Courses"
          title="Programs built for steady academic progress"
          description="Each program can be managed from the CMS and connected to classroom-level resources in the portal."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {rows.map((course) => (
            <article key={course.id || course.slug} className="panel p-6">
              <p className="text-sm font-black text-amber-700">{course.grade_range || "General"}</p>
              <h2 className="mt-3 text-xl font-black text-slate-950">{course.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{course.description}</p>
            </article>
          ))}
          {rows.length === 0 && <p className="text-slate-500">No courses available.</p>}
        </div>
      </div>
    </section>
  );
}
