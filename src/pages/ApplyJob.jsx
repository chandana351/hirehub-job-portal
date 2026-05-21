import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "../components/toast.jsx";
import { sampleJobs } from "../data/sampleJobs";
import { db } from "../firebase/firebase";

const ApplyJob = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    resumeLink: "",
    coverLetter: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        if (!db) {
          setJob(sampleJobs.find((item) => item.id === id) || null);
          return;
        }
        const jobSnap = await getDoc(doc(db, "jobs", id));
        const resolvedJob = jobSnap.exists()
          ? { id: jobSnap.id, ...jobSnap.data() }
          : sampleJobs.find((item) => item.id === id);
        setJob(resolvedJob || null);

        const duplicateQuery = query(
          collection(db, "applications"),
          where("jobId", "==", id),
          where("userId", "==", user.uid),
        );
        const duplicateSnap = await getDocs(duplicateQuery);
        setAlreadyApplied(!duplicateSnap.empty);
      } catch {
        setJob(sampleJobs.find((item) => item.id === id) || null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, user.uid]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (alreadyApplied) {
      toast.error("You have already applied for this job");
      return;
    }
    if (!db) {
      toast.error("Add Firebase config in .env to submit applications");
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, "applications"), {
        ...form,
        userId: user.uid,
        jobId: id,
        jobTitle: job.title,
        company: job.company,
        status: "Pending",
        createdAt: serverTimestamp(),
      });
      setAlreadyApplied(true);
      toast.success("Application submitted successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner label="Preparing application" />;

  if (!job) {
    return (
      <section className="container-page py-12">
        <div className="panel p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">
            Job not found
          </h1>
          <Link to="/jobs" className="btn-primary mt-5">
            Browse jobs
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">
            Apply for {job.title}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {job.company} • {job.location}
          </p>
        </div>

        {alreadyApplied ? (
          <div className="panel p-8 text-center">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
              Application already submitted
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              You can track the status from your dashboard.
            </p>
            <Link to="/dashboard" className="btn-primary mt-5">
              Go to dashboard
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="panel grid gap-4 p-6">
            <input
              className="input-field"
              placeholder="Full name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className="input-field"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <input
              className="input-field"
              type="url"
              placeholder="Resume link"
              value={form.resumeLink}
              onChange={(e) => setForm({ ...form, resumeLink: e.target.value })}
              required
            />
            <textarea
              className="input-field min-h-36"
              placeholder="Cover letter"
              value={form.coverLetter}
              onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
              required
            />
            <button className="btn-primary" disabled={submitting}>
              <Send className="h-4 w-4" />
              {submitting ? "Submitting..." : "Submit application"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ApplyJob;
