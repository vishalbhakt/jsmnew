export default function PageHeader({ kicker, title, description, actions }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        {kicker && <p className="section-kicker">{kicker}</p>}
        <h1 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-3xl text-slate-600">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
