import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft, Banknote, Briefcase, Clock, MapPin, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { sampleJobs } from "../data/sampleJobs";
import { db } from "../firebase/firebase";

const JobDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJob = async () => {
      try {
        if (!db) {
          setJob(sampleJobs.find((item) => item.id === id) || null);
          return;
        }
        const snap = await getDoc(doc(db, "jobs", id));
        if (snap.exists()) {
          setJob({ id: snap.id, ...snap.data() });
        } else {
          setJob(sampleJobs.find((item) => item.id === id) || null);
        }
      } catch {
        setJob(sampleJobs.find((item) => item.id === id) || null);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) return <LoadingSpinner label="Loading job details" />;

  if (!job) {
    return (
      <section className="container-page py-12">
        <div className="panel p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">
            Job not found
          </h1>
          <Link to="/jobs" className="btn-primary mt-5">
            Back to jobs
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-10">
      <button className="btn-secondary mb-6" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <article className="panel p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <span className="badge">{job.status || "active"}</span>
              <h1 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">
                {job.title}
              </h1>
              <p className="mt-2 text-lg font-semibold text-brand-600 dark:text-brand-100">
                {job.company}
              </p>
            </div>
            <Link to={user ? `/jobs/${job.id}/apply` : "/login"} className="btn-primary">
              <Send className="h-4 w-4" />
              Apply now
            </Link>
          </div>

          <div className="mt-6 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-600" /> {job.location}
            </p>
            <p className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-brand-600" /> {job.salary}
            </p>
            <p className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-brand-600" /> {job.jobType}
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-600" /> {job.experience}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
              Job description
            </h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              {job.description}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
              Responsibilities
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
              {(job.responsibilities || ["Collaborate with teams", "Build quality user interfaces"]).map(
                (item) => (
                  <li key={item}>{item}</li>
                ),
              )}
            </ul>
          </div>
        </article>

        <aside className="panel h-fit p-6">
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
            Required skills
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {(job.skills || []).map((skill) => (
              <span key={skill} className="badge">
                {skill}
              </span>
            ))}
          </div>
          <Link to={user ? `/jobs/${job.id}/apply` : "/login"} className="btn-primary mt-6 w-full">
            <Send className="h-4 w-4" />
            Apply for this role
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default JobDetails;
