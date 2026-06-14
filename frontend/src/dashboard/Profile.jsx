import { User } from "lucide-react";
import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import { useAuth } from "../hooks/useAuth";
import { api, getErrorMessage } from "../services/api";

export default function Profile() {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await api.get("/auth/me/");
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile");
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const { data } = await api.patch("/auth/me/", formData);
      setMessage({ type: "success", text: "Profile updated successfully." });
      
      // Update local storage user data
      const storedUser = JSON.parse(localStorage.getItem("jsm_user"));
      const updatedUser = { ...storedUser, ...data };
      localStorage.setItem("jsm_user", JSON.stringify(updatedUser));
      
    } catch (err) {
      setMessage({ type: "error", text: getErrorMessage(err, "Failed to update profile.") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader kicker="Account" title="My Profile" description="Manage your personal information and contact details." />
      
      <div className="mt-6 max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{user?.full_name || user?.username}</h2>
            <p className="text-sm font-bold uppercase text-emerald-700">{user?.role}</p>
          </div>
        </div>

        {message.text && (
          <div className={`mb-6 rounded-lg p-4 text-sm font-bold ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field-label">
              First Name
              <input className="field" name="first_name" value={formData.first_name} onChange={handleChange} required />
            </label>
            <label className="field-label">
              Last Name
              <input className="field" name="last_name" value={formData.last_name} onChange={handleChange} required />
            </label>
          </div>
          
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field-label">
              Phone Number
              <input className="field" name="phone" value={formData.phone} onChange={handleChange} />
            </label>
            <label className="field-label">
              Email Address
              <input className="field bg-slate-50 text-slate-500" value={user?.email || ""} readOnly disabled />
            </label>
          </div>

          <label className="field-label">
            Address
            <textarea 
              className="field min-h-[100px] resize-y" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
            />
          </label>

          <div className="mt-4 flex justify-end">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}