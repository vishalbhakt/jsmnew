import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";
import { useResource } from "../hooks/useResource";
import { resourceFallbacks } from "../utils/fixtures";

function rowMatches(row, search) {
  if (!search.trim()) {
    return true;
  }
  const needle = search.toLowerCase();
  return Object.values(row).join(" ").toLowerCase().includes(needle);
}

export default function ResourcePage({ title, description, endpoint, columns, kicker = "Portal" }) {
  const [search, setSearch] = useState("");
  const { rows, loading, error } = useResource(endpoint, resourceFallbacks[endpoint] || []);

  const filtered = useMemo(() => rows.filter((row) => rowMatches(row, search)), [rows, search]);

  return (
    <div>
      <PageHeader kicker={kicker} title={title} description={description} />

      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <label className="relative block w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            className="field pl-10"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search records"
          />
        </label>
        <div className="flex flex-wrap gap-2 text-sm font-bold">
          {loading && <span className="status-pill">Loading</span>}
          {error && <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">Fallback data</span>}
          <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-700">{filtered.length} records</span>
        </div>
      </div>

      <DataTable columns={columns} rows={filtered} />
    </div>
  );
}
