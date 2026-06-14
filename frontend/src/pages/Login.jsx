import { LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../services/api";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await login(form);
      setSuccess(true);
      setTimeout(() => {
        navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
      }, 500);
    } catch (err) {
      setError(getErrorMessage(err, "Invalid login credentials. Please check your username/email and password."));
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
            Username or Email
            <input 
              className="field" 
              name="username" 
              value={form.username} 
              onChange={updateField} 
              placeholder="admin or admin@jsmshiksha.local"
              required 
            />
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
          {success && <p className="rounded-lg bg-emerald-50 p-3 text-sm font-bold text-emerald-700">Login successful! Redirecting...</p>}
          <button className="btn btn-primary" type="submit" disabled={loading || success}>
            <LogIn size={18} />
            {loading ? "Signing in..." : success ? "Authenticated" : "Login"}
          </button>
          <p className="text-center text-sm font-bold text-slate-600">
            New account? <Link className="text-emerald-700" to="/register">Register</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
