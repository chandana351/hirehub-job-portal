import { collection, getDocs, query, where } from "firebase/firestore";
import { CheckCircle2, Clock3, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { db } from "../firebase/firebase";

const statusStyles = {
  Pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  Reviewed: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
  Selected: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  Rejected: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
};

const UserDashboard = ({ user }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      if (!db) {
        setApplications([]);
        setLoading(false);
        return;
      }
      const applicationsQuery = query(
        collection(db, "applications"),
        where("userId", "==", user.uid),
      );
      const snapshot = await getDocs(applicationsQuery);
      setApplications(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
      setLoading(false);
    };

    loadApplications();
  }, [user.uid]);

  const selectedCount = applications.filter((item) => item.status === "Selected").length;

  return (
    <section className="container-page py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">
          My dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Track all roles you have applied to from this account.
        </p>
      </div>

      <div className="mb-7 grid gap-4 md:grid-cols-3">
        <div className="panel p-5">
          <FileText className="h-6 w-6 text-brand-600" />
          <p className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">
            {applications.length}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Applications</p>
        </div>
        <div className="panel p-5">
          <Clock3 className="h-6 w-6 text-amber-600" />
          <p className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">
            {applications.filter((item) => item.status === "Pending").length}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Pending</p>
        </div>
        <div className="panel p-5">
          <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          <p className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">
            {selectedCount}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Selected</p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner label="Loading your applications" />
      ) : applications.length ? (
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <tr>
                  <th className="px-5 py-3 font-semibold">Job</th>
                  <th className="px-5 py-3 font-semibold">Company</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td className="px-5 py-4 font-medium text-slate-950 dark:text-white">
                      {application.jobTitle}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {application.company}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {application.email}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[application.status] || statusStyles.Pending}`}>
                        {application.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No applications yet"
          message="Once you apply for a job, it will appear here with its hiring status."
        />
      )}
    </section>
  );
};

export default UserDashboard;
