import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../services/api";

const initialForm = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  phone: "",
  role: "student",
  password: "",
};

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setMessage(getErrorMessage(err, "Registration failed."));
    }
  }

  return (
    <section className="page-band">
      <div className="container-x grid min-h-[62vh] place-items-center">
        <form className="panel grid w-full max-w-2xl gap-4 p-6" onSubmit={submit}>
          <div>
            <p className="section-kicker">Portal account</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">Register</h1>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field-label">
              First name
              <input className="field" name="first_name" value={form.first_name} onChange={updateField} required />
            </label>
            <label className="field-label">
              Last name
              <input className="field" name="last_name" value={form.last_name} onChange={updateField} required />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field-label">
              Username
              <input className="field" name="username" value={form.username} onChange={updateField} required />
            </label>
            <label className="field-label">
              Email
              <input className="field" type="email" name="email" value={form.email} onChange={updateField} required />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field-label">
              Phone
              <input className="field" name="phone" value={form.phone} onChange={updateField} />
            </label>
            <label className="field-label">
              Role
              <select className="field" name="role" value={form.role} onChange={updateField}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </label>
          </div>
          <label className="field-label">
            Password
            <input className="field" type="password" name="password" value={form.password} onChange={updateField} required />
          </label>
          {message && <p className="rounded-lg bg-rose-50 p-3 text-sm font-bold text-rose-700">{message}</p>}
          <button className="btn btn-primary w-fit" type="submit" disabled={loading}>
            <UserPlus size={18} />
            {loading ? "Creating" : "Create Account"}
          </button>
          <p className="text-sm font-bold text-slate-600">
            Already registered? <Link className="text-emerald-700" to="/login">Login</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
