import { collection, getDocs, query, where } from "firebase/firestore";
import { Filter, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { sampleJobs } from "../data/sampleJobs";
import { db } from "../firebase/firebase";
import { fieldMatches, matchesJobQuery } from "../utils/search";

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get("title") || "",
    company: searchParams.get("company") || "",
    location: searchParams.get("location") || "",
    jobType: "",
    experience: "",
  });

  useEffect(() => {
    const loadJobs = async () => {
      try {
        if (!db) {
          setJobs(sampleJobs);
          return;
        }
        const jobsQuery = query(collection(db, "jobs"), where("status", "==", "active"));
        const snapshot = await getDocs(jobsQuery);
        const firestoreJobs = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setJobs(firestoreJobs.length ? firestoreJobs : sampleJobs);
      } catch {
        setJobs(sampleJobs);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchMatch = matchesJobQuery(job, filters.search);
      const companyMatch = fieldMatches(job.company, filters.company);
      const locationMatch = fieldMatches(job.location, filters.location);
      const typeMatch = !filters.jobType || job.jobType === filters.jobType;
      const experienceMatch =
        !filters.experience || job.experience === filters.experience;

      return searchMatch && companyMatch && locationMatch && typeMatch && experienceMatch;
    });
  }, [filters, jobs]);

  const uniqueValues = (key) => [...new Set(jobs.map((job) => job[key]).filter(Boolean))];

  return (
    <section className="container-page py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">
            Job listings
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Search and filter roles by title, company, location, type, and experience.
          </p>
        </div>
        <span className="badge">{filteredJobs.length} jobs found</span>
      </div>

      <div className="panel mb-7 grid gap-3 p-4 md:grid-cols-5">
        <div className="relative md:col-span-2">
          <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            className="input-field pl-9"
            placeholder="Search title or skill"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <input
          className="input-field"
          placeholder="Company"
          value={filters.company}
          onChange={(e) => setFilters({ ...filters, company: e.target.value })}
        />
        <input
          className="input-field"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <div className="flex gap-3">
          <select
            className="input-field"
            value={filters.jobType}
            onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
          >
            <option value="">All types</option>
            {uniqueValues("jobType").map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <Filter className="mt-3 h-4 w-4 shrink-0 text-slate-400" />
        </div>
        <select
          className="input-field md:col-span-2"
          value={filters.experience}
          onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
        >
          <option value="">All experience levels</option>
          {uniqueValues("experience").map((experience) => (
            <option key={experience} value={experience}>
              {experience}
            </option>
          ))}
        </select>
        <button
          className="btn-secondary md:col-span-3"
          onClick={() =>
            setFilters({ search: "", company: "", location: "", jobType: "", experience: "" })
          }
        >
          Clear filters
        </button>
      </div>

      {loading ? (
        <LoadingSpinner label="Loading jobs" />
      ) : filteredJobs.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No matching jobs"
          message="Try changing the search terms or removing one of the filters."
        />
      )}
    </section>
  );
};

export default Jobs;
