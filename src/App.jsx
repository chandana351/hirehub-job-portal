import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { auth, db, firebaseReady } from "./firebase/firebase";
import AddJob from "./pages/AddJob";
import AdminDashboard from "./pages/AdminDashboard";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import ManageJobs from "./pages/ManageJobs";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";

const App = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("user");
  const [authLoading, setAuthLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("hirehub-theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("hirehub-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (!firebaseReady) {
      setAuthLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userSnap = await getDoc(doc(db, "users", currentUser.uid));
        setUserRole(userSnap.exists() ? userSnap.data().role || "user" : "user");
      } else {
        setUserRole("user");
      }
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  const authProps = useMemo(
    () => ({ user, userRole, loading: authLoading }),
    [authLoading, user, userRole],
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <Navbar
        user={user}
        userRole={userRole}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails user={user} />} />
          <Route
            path="/jobs/:id/apply"
            element={
              <ProtectedRoute {...authProps}>
                <ApplyJob user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute {...authProps}>
                <UserDashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute {...authProps}>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <AdminRoute {...authProps}>
                <ManageJobs />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/jobs/add"
            element={
              <AdminRoute {...authProps}>
                <AddJob />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/jobs/edit/:id"
            element={
              <AdminRoute {...authProps}>
                <AddJob editMode />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <AdminRoute {...authProps}>
                <Applications />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
