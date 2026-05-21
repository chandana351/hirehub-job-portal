import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { BriefcaseBusiness, Building2, Code2, MapPin, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { sampleJobs } from "../data/sampleJobs";
import { db } from "../firebase/firebase";

const categories = [
  { title: "Frontend", count: "120+ roles", icon: Code2 },
  { title: "Remote", count: "80+ roles", icon: MapPin },
  { title: "Internships", count: "60+ roles", icon: BriefcaseBusiness },
  { title: "MNC Hiring", count: "40+ roles", icon: Building2 },
];

const Home = () => {
  const [search, setSearch] = useState({ title: "", company: "", location: "" });
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFeaturedJobs = async () => {
      try {
        if (!db) {
          setFeaturedJobs(sampleJobs.slice(0, 3));
          return;
        }
        const jobsQuery = query(
          collection(db, "jobs"),
          where("status", "==", "active"),
          limit(3),
        );
        const snapshot = await getDocs(jobsQuery);
        const jobs = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setFeaturedJobs(jobs.length ? jobs : sampleJobs.slice(0, 3));
      } catch {
        setFeaturedJobs(sampleJobs.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedJobs();
  }, []);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(search).forEach(([key, value]) => {
      if (value.trim()) params.set(key, value.trim());
    });
    return params.toString();
  }, [search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/jobs${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <>
      <section className="bg-white dark:bg-slate-950">
        <div className="container-page grid min-h-[620px] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="badge bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-brand-100">
              Fresher-focused hiring platform
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              HireHub Job Portal
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Discover verified frontend, React, UI, and internship roles built
              for early career developers.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto]"
            >
              <input
                className="input-field"
                placeholder="Job title"
                value={search.title}
                onChange={(e) => setSearch({ ...search, title: e.target.value })}
              />
              <input
                className="input-field"
                placeholder="Company"
                value={search.company}
                onChange={(e) => setSearch({ ...search, company: e.target.value })}
              />
              <input
                className="input-field"
                placeholder="Location"
                value={search.location}
                onChange={(e) =>
                  setSearch({ ...search, location: e.target.value })
                }
              />
              <button className="btn-primary sm:col-span-3 lg:col-span-1">
                <Search className="h-4 w-4" /> Search
              </button>
            </form>
          </div>

          <div className="grid gap-4">
            <div className="rounded-lg bg-slate-950 p-6 text-white shadow-soft dark:bg-slate-900">
              <p className="text-sm text-brand-100">Today&apos;s focus</p>
              <h2 className="mt-3 text-3xl font-bold">React fresher roles</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Filter jobs, apply once, track status, and let admins manage the
                full hiring workflow from one dashboard.
              </p>
              <Link to="/jobs" className="btn-primary mt-6 bg-white text-brand-700 hover:bg-brand-50">
                Browse jobs
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="panel p-5">
                <p className="text-3xl font-bold text-slate-950 dark:text-white">250+</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Open roles</p>
              </div>
              <div className="panel p-5">
                <p className="text-3xl font-bold text-slate-950 dark:text-white">90+</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Hiring companies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(({ title, count, icon: Icon }) => (
              <Link
                key={title}
                to={`/jobs?title=${encodeURIComponent(title)}`}
                className="panel p-5 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <Icon className="h-7 w-7 text-brand-600" />
                <h3 className="mt-4 font-semibold text-slate-950 dark:text-white">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {count}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
              Featured jobs
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Fresh opportunities from Firestore, with local samples when empty.
            </p>
          </div>
          <Link to="/jobs" className="btn-secondary">
            View all jobs
          </Link>
        </div>
        {loading ? (
          <LoadingSpinner label="Loading featured jobs" />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
