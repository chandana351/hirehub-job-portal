import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../components/toast.jsx";
import { auth, db } from "../firebase/firebase";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!auth || !db) {
      toast.error("Add Firebase config in .env to enable signup");
      return;
    }
    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );
      await updateProfile(credential.user, { displayName: form.name });
      await setDoc(doc(db, "users", credential.user.uid), {
        name: form.name,
        email: form.email,
        role: "user",
        createdAt: serverTimestamp(),
      });
      toast.success("Account created");
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
        <UserPlus className="h-9 w-9 text-brand-600" />
        <h1 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">
          Create your account
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input
            className="input-field"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
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
            minLength="6"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="btn-primary" disabled={loading}>
            <UserPlus className="h-4 w-4" />
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>
        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-brand-600">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
