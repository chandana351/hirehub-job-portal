import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "../components/toast.jsx";
import { db } from "../firebase/firebase";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    if (!db) {
      setJobs([]);
      setLoading(false);
      return;
    }
    const snapshot = await getDocs(collection(db, "jobs"));
    setJobs(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
    setLoading(false);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this job permanently?");
    if (!confirmed) return;
    if (!db) {
      toast.error("Add Firebase config in .env to delete jobs");
      return;
    }
    await deleteDoc(doc(db, "jobs", id));
    toast.success("Job deleted");
    loadJobs();
  };

  return (
    <section className="container-page py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">
            Manage jobs
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add, edit, and remove Firestore job postings.
          </p>
        </div>
        <Link to="/admin/jobs/add" className="btn-primary">
          <Plus className="h-4 w-4" /> Add job
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner label="Loading jobs" />
      ) : jobs.length ? (
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <tr>
                  <th className="px-5 py-3 font-semibold">Title</th>
                  <th className="px-5 py-3 font-semibold">Company</th>
                  <th className="px-5 py-3 font-semibold">Location</th>
                  <th className="px-5 py-3 font-semibold">Type</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-5 py-4 font-medium text-slate-950 dark:text-white">
                      {job.title}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {job.company}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {job.location}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {job.jobType}
                    </td>
                    <td className="px-5 py-4">
                      <span className="badge">{job.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <Link to={`/admin/jobs/edit/${job.id}`} className="btn-secondary h-9 px-3">
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          className="btn-secondary h-9 px-3 text-rose-600 hover:text-rose-700"
                          onClick={() => handleDelete(job.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No Firestore jobs yet"
          message="Add the first admin-created job to populate the live database."
        />
      )}
    </section>
  );
};

export default ManageJobs;
