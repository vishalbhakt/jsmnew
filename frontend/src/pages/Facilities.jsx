import { Library, LineChart, Monitor, ShieldCheck } from "lucide-react";

import PageHeader from "../components/PageHeader";
import { useResource } from "../hooks/useResource";

const iconMap = { Monitor, Library, LineChart, ShieldCheck };

export default function Facilities() {
  const { rows } = useResource("/facilities/");

  return (
    <section className="page-band bg-white">
      <div className="container-x">
        <PageHeader
          kicker="Facilities"
          title="Facilities for classroom and portal-led learning"
          description="Facilities can be updated from the CMS and reflected on the public website."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rows.map((facility) => {
            const Icon = iconMap[facility.icon] || ShieldCheck;
            return (
              <article key={facility.id || facility.title} className="panel p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <Icon size={22} />
                </span>
                <h2 className="mt-4 text-xl font-black text-slate-950">{facility.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{facility.description}</p>
              </article>
            );
          })}
          {rows.length === 0 && <p className="text-slate-500">No facilities available.</p>}
        </div>
      </div>
    </section>
  );
}
