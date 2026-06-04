import { TrendingUp } from "lucide-react";

export default function StatCard({ label, value, trend }) {
  return (
    <div className="panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
          <TrendingUp size={20} />
        </span>
      </div>
      <p className="mt-4 text-sm font-bold text-emerald-700">{trend}</p>
    </div>
  );
}
