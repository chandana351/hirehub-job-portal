import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { ExternalLink, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "../components/toast.jsx";
import { db } from "../firebase/firebase";

const statuses = ["Pending", "Reviewed", "Selected", "Rejected"];

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApplications = async () => {
    if (!db) {
      setApplications([]);
      setLoading(false);
      return;
    }
    const snapshot = await getDocs(collection(db, "applications"));
    setApplications(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
    setLoading(false);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusChange = async (applicationId, status) => {
    if (!db) {
      toast.error("Add Firebase config in .env to update applications");
      return;
    }
    await updateDoc(doc(db, "applications", applicationId), { status });
    toast.success("Application status updated");
    loadApplications();
  };

  return (
    <section className="container-page py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">
          Applications
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          View applicant details and update their hiring status.
        </p>
      </div>

      {loading ? (
        <LoadingSpinner label="Loading applications" />
      ) : applications.length ? (
        <div className="grid gap-5">
          {applications.map((application) => (
            <article key={application.id} className="panel p-5">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
                    {application.fullName}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-100">
                    {application.jobTitle} at {application.company}
                  </p>
                  <div className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> {application.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> {application.phone}
                    </p>
                  </div>
                </div>
                <select
                  className="input-field max-w-xs"
                  value={application.status}
                  onChange={(e) => handleStatusChange(application.id, e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="mt-5 rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {application.coverLetter}
              </div>
              <a
                href={application.resumeLink}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary mt-4"
              >
                <ExternalLink className="h-4 w-4" /> Resume
              </a>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No applications"
          message="Applications submitted by users will appear here."
        />
      )}
    </section>
  );
};

export default Applications;
