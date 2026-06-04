import { LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await login(form);
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid login credentials.");
    }
  }

  return (
    <section className="page-band">
      <div className="container-x grid min-h-[62vh] place-items-center">
        <form className="panel grid w-full max-w-md gap-4 p-6" onSubmit={submit}>
          <div>
            <p className="section-kicker">Secure portal</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">Login</h1>
          </div>
          <label className="field-label">
            Username
            <input className="field" name="username" value={form.username} onChange={updateField} required />
          </label>
          <label className="field-label">
            Password
            <input
              className="field"
              type="password"
              name="password"
              value={form.password}
              onChange={updateField}
              required
            />
          </label>
          {error && <p className="rounded-lg bg-rose-50 p-3 text-sm font-bold text-rose-700">{error}</p>}
          <button className="btn btn-primary" type="submit" disabled={loading}>
            <LogIn size={18} />
            {loading ? "Signing in" : "Login"}
          </button>
          <p className="text-center text-sm font-bold text-slate-600">
            New account? <Link className="text-emerald-700" to="/register">Register</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
