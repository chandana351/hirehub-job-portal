import { signInWithEmailAndPassword } from "firebase/auth";
import { BriefcaseBusiness, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../components/toast.jsx";
import { auth } from "../firebase/firebase";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!auth) {
      toast.error("Add Firebase config in .env to enable login");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      toast.success("Welcome back");
      navigate("/jobs");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-page flex min-h-[calc(100vh-12rem)] items-center justify-center py-12">
      <div className="panel w-full max-w-md p-7">
        <BriefcaseBusiness className="h-9 w-9 text-brand-600" />
        <h1 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">
          Login to HireHub
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input
            className="input-field"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="btn-primary" disabled={loading}>
            <LogIn className="h-4 w-4" />
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
          New here?{" "}
          <Link to="/signup" className="font-semibold text-brand-600">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
