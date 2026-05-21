import { ArrowRight, Banknote, Briefcase, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => (
  <article className="panel flex h-full flex-col p-5 transition hover:-translate-y-1 hover:shadow-soft">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
          {job.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-100">
          {job.company}
        </p>
      </div>
      <span className="badge">{job.status || "active"}</span>
    </div>

    <div className="mt-4 grid gap-2 text-sm text-slate-500 dark:text-slate-400">
      <p className="flex items-center gap-2">
        <MapPin className="h-4 w-4" /> {job.location}
      </p>
      <p className="flex items-center gap-2">
        <Banknote className="h-4 w-4" /> {job.salary}
      </p>
      <p className="flex items-center gap-2">
        <Briefcase className="h-4 w-4" /> {job.jobType}
      </p>
      <p className="flex items-center gap-2">
        <Clock className="h-4 w-4" /> {job.experience}
      </p>
    </div>

    <div className="mt-4 flex flex-wrap gap-2">
      {(job.skills || []).slice(0, 4).map((skill) => (
        <span key={skill} className="badge">
          {skill}
        </span>
      ))}
    </div>

    <Link to={`/jobs/${job.id}`} className="btn-secondary mt-5">
      View details <ArrowRight className="h-4 w-4" />
    </Link>
  </article>
);

export default JobCard;
