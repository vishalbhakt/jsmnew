export default function DataTable({ columns, rows, emptyText = "No records found" }) {
  if (!rows.length) {
    return <div className="panel p-6 text-sm font-bold text-slate-500">{emptyText}</div>;
  }

  return (
    <div className="panel table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id || JSON.stringify(row)}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : row[column.key] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
