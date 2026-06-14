import { useEffect, useState } from "react";

import { listResource, optionsResource, createResource, updateResource, deleteResource, getErrorMessage } from "../services/api";

export function useResource(endpoint) {
  const [rows, setRows] = useState([]);
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await listResource(endpoint);
      setRows(data);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load live data"));
    } finally {
      setLoading(false);
    }
  }

  async function loadSchema() {
    try {
      const data = await optionsResource(endpoint);
      setSchema(data.actions?.POST || null);
    } catch (err) {
      // Failed to load schema
    }
  }

  useEffect(() => {
    load();
    loadSchema();
  }, [endpoint]);

  async function addRecord(payload) {
    const newRecord = await createResource(endpoint, payload);
    setRows([...rows, newRecord]);
    return newRecord;
  }

  async function updateRecord(id, payload) {
    const updated = await updateResource(endpoint, id, payload);
    setRows(rows.map(r => r.id === id ? updated : r));
    return updated;
  }

  async function removeRecord(id) {
    await deleteResource(endpoint, id);
    setRows(rows.filter(r => r.id !== id));
  }

  return { rows, schema, loading, error, addRecord, updateRecord, removeRecord, refresh: load };
}
