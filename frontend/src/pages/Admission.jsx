import { Send } from "lucide-react";
import { useState } from "react";

import PageHeader from "../components/PageHeader";
import { createResource, getErrorMessage } from "../services/api";

const initialForm = {
  student_name: "",
  guardian_name: "",
  email: "",
  phone: "",
  preferred_class: "",
  message: "",
};

export default function Admission() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [saving, setSaving] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: "", message: "" });
    try {
      await createResource("/inquiries/", form);
      setForm(initialForm);
      setStatus({ type: "success", message: "Inquiry submitted. The admissions team will contact you." });
    } catch (error) {
      setStatus({ type: "error", message: getErrorMessage(error, "Unable to submit inquiry right now.") });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page-band">
      <div className="container-x grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <PageHeader
            kicker="Admission"
            title="Start an admission inquiry"
            description="Submit student and guardian details for the admissions team. The inquiry is stored in the backend CMS for admin follow-up."
          />
          <div className="grid gap-3 text-sm font-bold text-slate-600">
            <p>Academic session: 2026-27</p>
            <p>Programs: Primary, Middle School, Secondary Foundation</p>
            <p>Response channel: phone or email</p>
          </div>
        </div>

        <form className="panel grid gap-4 p-6" onSubmit={submit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field-label">
              Student name
              <input className="field" name="student_name" value={form.student_name} onChange={updateField} required />
            </label>
            <label className="field-label">
              Guardian name
              <input className="field" name="guardian_name" value={form.guardian_name} onChange={updateField} required />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field-label">
              Email
              <input className="field" type="email" name="email" value={form.email} onChange={updateField} required />
            </label>
            <label className="field-label">
              Phone
              <input className="field" name="phone" value={form.phone} onChange={updateField} required />
            </label>
          </div>
          <label className="field-label">
            Preferred class
            <input className="field" name="preferred_class" value={form.preferred_class} onChange={updateField} required />
          </label>
          <label className="field-label">
            Message
            <textarea className="field min-h-28" name="message" value={form.message} onChange={updateField} />
          </label>
          {status.message && (
            <p className={`rounded-lg p-3 text-sm font-bold ${status.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {status.message}
            </p>
          )}
          <button className="btn btn-primary w-fit" type="submit" disabled={saving}>
            <Send size={18} />
            {saving ? "Submitting" : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}
