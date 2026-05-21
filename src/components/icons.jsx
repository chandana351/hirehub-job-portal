const paths = {
  ArrowLeft: <path d="M19 12H5m6-6-6 6 6 6" />,
  ArrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  Banknote: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6 10v4M18 10v4" />
    </>
  ),
  Briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5h8v2M3 12h18" />
    </>
  ),
  BriefcaseBusiness: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5h8v2M3 13h18M12 12v2" />
    </>
  ),
  Building2: (
    <>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
      <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2" />
      <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
    </>
  ),
  CheckCircle2: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
  Clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  Clock3: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5h4" />
    </>
  ),
  Code2: <path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14 4l-4 16" />,
  Edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </>
  ),
  ExternalLink: <path d="M15 3h6v6M10 14 21 3M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />,
  FileText: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
    </>
  ),
  Filter: <path d="M3 5h18M6 12h12M10 19h4" />,
  LayoutDashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </>
  ),
  LogIn: <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />,
  LogOut: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
  Mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  MapPin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  Menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  Moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />,
  Phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.4 2.7a2 2 0 0 1-.6 1.8L7.6 9.5a16 16 0 0 0 6.9 6.9l1.3-1.3a2 2 0 0 1 1.8-.6l2.7.4a2 2 0 0 1 1.7 2Z" />,
  Plus: <path d="M12 5v14M5 12h14" />,
  Save: (
    <>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
      <path d="M17 21v-8H7v8M7 3v5h8" />
    </>
  ),
  Search: <path d="m21 21-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />,
  Send: <path d="m22 2-7 20-4-9-9-4Z" />,
  Sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  Trash2: (
    <>
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
    </>
  ),
  UserPlus: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 8v6M22 11h-6" />,
  Users: <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M20 8v6M23 11h-6" />,
  X: <path d="M18 6 6 18M6 6l12 12" />,
  XCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-6 6M9 9l6 6" />
    </>
  ),
};

const makeIcon = (name) => {
  const Icon = ({ size = 24, className = "", ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
  return Icon;
};

export const ArrowLeft = makeIcon("ArrowLeft");
export const ArrowRight = makeIcon("ArrowRight");
export const Banknote = makeIcon("Banknote");
export const Briefcase = makeIcon("Briefcase");
export const BriefcaseBusiness = makeIcon("BriefcaseBusiness");
export const Building2 = makeIcon("Building2");
export const CheckCircle2 = makeIcon("CheckCircle2");
export const Clock = makeIcon("Clock");
export const Clock3 = makeIcon("Clock3");
export const Code2 = makeIcon("Code2");
export const Edit = makeIcon("Edit");
export const ExternalLink = makeIcon("ExternalLink");
export const FileText = makeIcon("FileText");
export const Filter = makeIcon("Filter");
export const LayoutDashboard = makeIcon("LayoutDashboard");
export const LogIn = makeIcon("LogIn");
export const LogOut = makeIcon("LogOut");
export const Mail = makeIcon("Mail");
export const MapPin = makeIcon("MapPin");
export const Menu = makeIcon("Menu");
export const Moon = makeIcon("Moon");
export const Phone = makeIcon("Phone");
export const Plus = makeIcon("Plus");
export const Save = makeIcon("Save");
export const Search = makeIcon("Search");
export const Send = makeIcon("Send");
export const Sun = makeIcon("Sun");
export const Trash2 = makeIcon("Trash2");
export const UserPlus = makeIcon("UserPlus");
export const Users = makeIcon("Users");
export const X = makeIcon("X");
export const XCircle = makeIcon("XCircle");
