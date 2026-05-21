import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "../components/toast.jsx";
import { db } from "../firebase/firebase";

const initialForm = {
  title: "",
  company: "",
  location: "",
  salary: "",
  jobType: "Full-time",
  experience: "Fresher",
  skills: "",
  description: "",
  responsibilities: "",
  status: "active",
};

const AddJob = ({ editMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(editMode);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      if (!editMode || !id) return;
      if (!db) {
        setLoading(false);
        return;
      }
      const snap = await getDoc(doc(db, "jobs", id));
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          ...initialForm,
          ...data,
          skills: (data.skills || []).join(", "),
          responsibilities: (data.responsibilities || []).join("\n"),
        });
      }
      setLoading(false);
    };

    loadJob();
  }, [editMode, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!db) {
      toast.error("Add Firebase config in .env to manage jobs");
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      responsibilities: form.responsibilities
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      updatedAt: serverTimestamp(),
    };

    try {
      if (editMode) {
        await updateDoc(doc(db, "jobs", id), payload);
        toast.success("Job updated");
      } else {
        await addDoc(collection(db, "jobs"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        toast.success("Job added");
      }
      navigate("/admin/jobs");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading job form" />;

  return (
    <section className="container-page py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">
          {editMode ? "Edit job" : "Add new job"}
        </h1>
        <form onSubmit={handleSubmit} className="panel mt-7 grid gap-4 p-6 md:grid-cols-2">
          <input
            className="input-field"
            placeholder="Job title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="input-field"
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            required
          />
          <input
            className="input-field"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
          <input
            className="input-field"
            placeholder="Salary"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
            required
          />
          <select
            className="input-field"
            value={form.jobType}
            onChange={(e) => setForm({ ...form, jobType: e.target.value })}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Remote</option>
            <option>Contract</option>
          </select>
          <select
            className="input-field"
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
          >
            <option>Fresher</option>
            <option>0-1 years</option>
            <option>0-2 years</option>
            <option>1-3 years</option>
          </select>
          <input
            className="input-field md:col-span-2"
            placeholder="Skills, comma separated"
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            required
          />
          <textarea
            className="input-field min-h-32 md:col-span-2"
            placeholder="Job description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <textarea
            className="input-field min-h-32 md:col-span-2"
            placeholder="Responsibilities, one per line"
            value={form.responsibilities}
            onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
            required
          />
          <select
            className="input-field"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="active">active</option>
            <option value="closed">closed</option>
          </select>
          <button className="btn-primary md:col-span-2" disabled={saving}>
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save job"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddJob;
