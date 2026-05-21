import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

const notify = (type, message) => {
  window.dispatchEvent(
    new CustomEvent("hirehub-toast", {
      detail: { id: crypto.randomUUID(), type, message },
    }),
  );
};

export const toast = {
  success: (message) => notify("success", message),
  error: (message) => notify("error", message),
};

export const Toaster = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const onToast = (event) => {
      const item = event.detail;
      setItems((current) => [...current, item]);
      window.setTimeout(() => {
        setItems((current) => current.filter((toastItem) => toastItem.id !== item.id));
      }, 3200);
    };

    window.addEventListener("hirehub-toast", onToast);
    return () => window.removeEventListener("hirehub-toast", onToast);
  }, []);

  return (
    <div className="fixed right-4 top-20 z-50 grid w-[calc(100%-2rem)] max-w-sm gap-3">
      {items.map((item) => {
        const Icon = item.type === "success" ? CheckCircle2 : XCircle;
        return (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-800 shadow-soft dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <Icon
              className={`mt-0.5 h-5 w-5 shrink-0 ${
                item.type === "success" ? "text-emerald-600" : "text-rose-600"
              }`}
            />
            <p className="font-medium">{item.message}</p>
          </div>
        );
      })}
    </div>
  );
};
