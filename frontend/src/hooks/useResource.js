import { useEffect, useState } from "react";

import { listResource } from "../services/api";

export function useResource(endpoint, fallback = []) {
  const [rows, setRows] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await listResource(endpoint);
        if (active && data.length) {
          setRows(data);
        }
      } catch (err) {
        if (active) {
          setError(err.response?.data?.detail || "Unable to load live data");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [endpoint]);

  return { rows, loading, error };
}
