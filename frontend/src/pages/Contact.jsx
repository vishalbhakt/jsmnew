import { Clock3, Mail, MapPin, MessageSquareMore, Phone, Send } from "lucide-react";
import { useState } from "react";

import PageHeader from "../components/PageHeader";
import { createResource, getErrorMessage } from "../services/api";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const contactDetails = [
  {
    icon: Phone,
    label: "Call us",
    value: "+91 90000 00000",
    note: "Academic support and office coordination",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "support@jsmshikshaacademy.com",
    note: "Portal access, admissions, and general queries",
  },
  {
    icon: MapPin,
    label: "Visit campus",
    value: "JSM Shiksha Academy, India",
    note: "Meet the admissions and administration team",
  },
  {
    icon: Clock3,
    label: "Office hours",
    value: "Mon - Sat, 8:00 AM - 5:00 PM",
    note: "Typical reply within one business day",
  },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ tone: "", text: "" });

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setFeedback({ tone: "", text: "" });

    try {
      await createResource("/contact-messages/", form);
      setForm(initialForm);
      setFeedback({
        tone: "success",
        text: "Message sent. The academy team will get back to you shortly.",
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        text: getErrorMessage(error, "Unable to send your message right now."),
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page-band bg-white">
      <div className="container-x">
        <PageHeader
          kicker="Contact Us"
          title="Send a Message"
          description="Have a question? We're here to help."
        />

        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="grid gap-4">
            <article className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-white">
              <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-950 p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/14 text-white">
                  <MessageSquareMore size={24} />
                </span>
                <h2 className="mt-5 text-2xl font-black">Talk to the academy team</h2>
                <p className="mt-3 max-w-lg text-sm leading-7 text-slate-100/90">
                  Reach out for admissions, fee support, portal help, academic coordination, or
                  general questions about JSM Shiksha Academy.
                </p>
              </div>
              <div className="grid gap-px bg-white/10 md:grid-cols-2">
                {contactDetails.map(({ icon: Icon, label, value, note }) => (
                  <div key={label} className="bg-slate-950/92 p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400/12 text-amber-300">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 text-sm font-black uppercase tracking-normal text-amber-200">{label}</h3>
                    <p className="mt-2 text-base font-bold text-white">{value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{note}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <form className="panel grid gap-4 p-6 md:p-7" onSubmit={submit}>
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-black text-slate-950">Send a Message</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Share your question and the right team will respond by phone or email.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="field-label">
                Full name
                <input className="field" name="name" value={form.name} onChange={updateField} required />
              </label>
              <label className="field-label">
                Email address
                <input className="field" type="email" name="email" value={form.email} onChange={updateField} required />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="field-label">
                Phone number
                <input className="field" name="phone" value={form.phone} onChange={updateField} />
              </label>
              <label className="field-label">
                Subject
                <input className="field" name="subject" value={form.subject} onChange={updateField} required />
              </label>
            </div>

            <label className="field-label">
              Your message
              <textarea
                className="field min-h-36"
                name="message"
                value={form.message}
                onChange={updateField}
                required
              />
            </label>

            {feedback.text && (
              <p
                className={`rounded-lg p-3 text-sm font-bold ${
                  feedback.tone === "success"
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {feedback.text}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-bold text-slate-500">Response window: usually within one business day</p>
              <button className="btn btn-primary w-full sm:w-fit" type="submit" disabled={saving}>
                <Send size={18} />
                {saving ? "Sending" : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
