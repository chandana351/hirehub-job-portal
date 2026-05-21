import { collection, getDocs, query, where } from "firebase/firestore";
import { BriefcaseBusiness, FileText, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { db } from "../firebase/firebase";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ jobs: 0, applications: 0, active: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      if (!db) {
        setLoading(false);
        return;
      }
      const [jobsSnap, applicationsSnap, activeJobsSnap, usersSnap] = await Promise.all([
        getDocs(collection(db, "jobs")),
        getDocs(collection(db, "applications")),
        getDocs(query(collection(db, "jobs"), where("status", "==", "active"))),
        getDocs(collection(db, "users")),
      ]);
      setStats({
        jobs: jobsSnap.size,
        applications: applicationsSnap.size,
        active: activeJobsSnap.size,
        users: usersSnap.size,
      });
      setLoading(false);
    };

    loadStats();
  }, []);

  if (loading) return <LoadingSpinner label="Loading admin dashboard" />;

  const cards = [
    { label: "Total jobs", value: stats.jobs, icon: BriefcaseBusiness },
    { label: "Total applications", value: stats.applications, icon: FileText },
    { label: "Active jobs", value: stats.active, icon: BriefcaseBusiness },
    { label: "Users count", value: stats.users, icon: Users },
  ];

  return (
    <section className="container-page py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">
            Admin dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage jobs, monitor applications, and review platform activity.
          </p>
        </div>
        <Link to="/admin/jobs/add" className="btn-primary">
          <Plus className="h-4 w-4" /> Add new job
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="panel p-5">
            <Icon className="h-6 w-6 text-brand-600" />
            <p className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">
              {value}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link to="/admin/jobs" className="panel p-6 transition hover:shadow-soft">
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
            Manage jobs
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Edit, delete, or publish new job openings.
          </p>
        </Link>
        <Link to="/admin/applications" className="panel p-6 transition hover:shadow-soft">
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
            View applications
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Inspect applicants and update application progress.
          </p>
        </Link>
      </div>
    </section>
  );
};

export default AdminDashboard;
