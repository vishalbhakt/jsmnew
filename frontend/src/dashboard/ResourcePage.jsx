import { Search, Plus, Edit2, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";

import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";
import { useResource } from "../hooks/useResource";
import { getErrorMessage } from "../services/api";

function rowMatches(row, search) {
  if (!search.trim()) {
    return true;
  }
  const needle = search.toLowerCase();
  return Object.values(row).join(" ").toLowerCase().includes(needle);
}

function DynamicForm({ schema, initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialData || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e, fieldName, type) => {
    let value = e.target.value;
    if (type === "boolean") value = e.target.checked;
    if (type === "image upload" || type === "file upload") value = e.target.files[0];
    
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Create FormData if files are present
      const hasFiles = Object.values(schema).some(f => f.type === "image upload" || f.type === "file upload");
      
      let submitData = formData;
      if (hasFiles) {
        submitData = new FormData();
        Object.keys(formData).forEach(key => {
          if (formData[key] !== null && formData[key] !== undefined) {
            submitData.append(key, formData[key]);
          }
        });
      }

      await onSubmit(submitData);
    } catch (err) {
      setError(getErrorMessage(err, "An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{initialData ? "Edit Record" : "Add Record"}</h2>
          <button onClick={onCancel} className="text-slate-500 hover:text-slate-800">
            <X size={20} />
          </button>
        </div>
        
        {error && <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-800">{error}</div>}

        <form onSubmit={handleSubmit} className="grid gap-4">
          {Object.entries(schema).map(([fieldName, field]) => {
            if (field.read_only) return null;
            
            const commonProps = {
              id: fieldName,
              required: field.required,
              className: "field w-full",
              disabled: loading
            };

            let inputElement = null;

            if (field.type === "choice") {
              inputElement = (
                <select 
                  {...commonProps} 
                  value={formData[fieldName] || ""} 
                  onChange={(e) => handleChange(e, fieldName, field.type)}
                >
                  <option value="">Select...</option>
                  {field.choices.map(c => (
                    <option key={c.value} value={c.value}>{c.display_name}</option>
                  ))}
                </select>
              );
            } else if (field.type === "boolean") {
              inputElement = (
                <input 
                  type="checkbox" 
                  id={fieldName}
                  checked={formData[fieldName] || false}
                  onChange={(e) => handleChange(e, fieldName, field.type)}
                  disabled={loading}
                  className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-600"
                />
              );
            } else if (field.type === "image upload" || field.type === "file upload") {
              inputElement = (
                <input 
                  type="file" 
                  {...commonProps}
                  onChange={(e) => handleChange(e, fieldName, field.type)}
                />
              );
            } else if (field.type === "datetime") {
               inputElement = (
                <input 
                  type="datetime-local" 
                  {...commonProps}
                  value={formData[fieldName] ? formData[fieldName].slice(0, 16) : ""}
                  onChange={(e) => handleChange(e, fieldName, field.type)}
                />
              );
            } else if (field.type === "date") {
               inputElement = (
                <input 
                  type="date" 
                  {...commonProps}
                  value={formData[fieldName] || ""}
                  onChange={(e) => handleChange(e, fieldName, field.type)}
                />
              );
            } else {
              // Default text input
              inputElement = (
                <input 
                  type={field.type === "email" ? "email" : field.type === "integer" ? "number" : "text"} 
                  {...commonProps}
                  value={formData[fieldName] || ""}
                  onChange={(e) => handleChange(e, fieldName, field.type)}
                />
              );
            }

            return (
              <div key={fieldName} className={field.type === "boolean" ? "flex items-center gap-2" : ""}>
                <label htmlFor={fieldName} className="block text-sm font-bold text-slate-700 mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {inputElement}
                {field.help_text && <p className="mt-1 text-xs text-slate-500">{field.help_text}</p>}
              </div>
            );
          })}
          
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onCancel} disabled={loading} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ResourcePage({ title, description, endpoint, columns, kicker = "Portal" }) {
  const [search, setSearch] = useState("");
  const { rows, schema, loading, error, addRecord, updateRecord, removeRecord } = useResource(endpoint);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const filtered = useMemo(() => rows.filter((row) => rowMatches(row, search)), [rows, search]);

  const tableColumns = useMemo(() => {
    let baseColumns = columns;
    if (!baseColumns) {
      if (rows.length > 0) {
        // Generate basic columns from first row
        baseColumns = Object.keys(rows[0])
          .filter(k => k !== "id" && typeof rows[0][k] !== "object")
          .slice(0, 4)
          .map(k => ({ key: k, label: k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }));
      } else if (schema) {
        // Generate from schema
        baseColumns = Object.entries(schema)
          .filter(([k, v]) => !v.read_only && v.type !== "text" && v.type !== "choice")
          .slice(0, 4)
          .map(([k, v]) => ({ key: k, label: v.label }));
      } else {
        baseColumns = [{ key: "id", label: "ID" }];
      }
    }

    if (!schema) return baseColumns;
    return [
      ...baseColumns,
      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <div className="flex items-center justify-end gap-2">
            <button 
              onClick={() => { setEditingData(row); setIsFormOpen(true); }}
              className="text-slate-400 hover:text-teal-600 p-1"
              title="Edit"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={async () => {
                if (window.confirm("Are you sure you want to delete this record?")) {
                  try {
                    await removeRecord(row.id);
                  } catch (err) {
                    alert(getErrorMessage(err, "Failed to delete"));
                  }
                }
              }}
              className="text-slate-400 hover:text-red-600 p-1"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )
      }
    ];
  }, [columns, schema, rows, removeRecord]);

  const handleFormSubmit = async (data) => {
    if (editingData) {
      await updateRecord(editingData.id, data);
    } else {
      await addRecord(data);
    }
    setIsFormOpen(false);
    setEditingData(null);
  };

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
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold">
          {loading && <span className="status-pill">Loading</span>}
          {error && <span className="rounded-full bg-red-100 px-3 py-1 text-red-800">{error}</span>}
          <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-700">{filtered.length} records</span>
          {schema && (
            <button 
              onClick={() => { setEditingData(null); setIsFormOpen(true); }}
              className="flex items-center gap-1 rounded bg-teal-600 px-3 py-1 text-white hover:bg-teal-700"
            >
              <Plus size={16} /> Add New
            </button>
          )}
        </div>
      </div>

      <DataTable columns={tableColumns} rows={filtered} />
      
      {isFormOpen && schema && (
        <DynamicForm 
          schema={schema} 
          initialData={editingData} 
          onSubmit={handleFormSubmit} 
          onCancel={() => { setIsFormOpen(false); setEditingData(null); }} 
        />
      )}
    </div>
  );
}
