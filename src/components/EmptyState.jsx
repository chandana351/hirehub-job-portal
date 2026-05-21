import { BriefcaseBusiness } from "lucide-react";

const EmptyState = ({ title, message }) => (
  <div className="panel flex min-h-[220px] flex-col items-center justify-center px-6 py-10 text-center">
    <BriefcaseBusiness className="h-10 w-10 text-slate-400" />
    <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
      {title}
    </h3>
    <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
      {message}
    </p>
  </div>
);

export default EmptyState;
