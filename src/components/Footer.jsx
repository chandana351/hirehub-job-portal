import { BriefcaseBusiness, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
    <div className="container-page grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <div className="flex items-center gap-2 text-lg font-bold text-slate-950 dark:text-white">
          <BriefcaseBusiness className="h-6 w-6 text-brand-600" />
          HireHub
        </div>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          A professional fresher-friendly job portal built with React, Tailwind,
          Firebase Authentication, and Firestore.
        </p>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
          Portal
        </h4>
        <div className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
          <p>Featured jobs</p>
          <p>Applications</p>
          <p>Admin tools</p>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
          Contact
        </h4>
        <div className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> careers@hirehub.dev
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Bengaluru, India
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
