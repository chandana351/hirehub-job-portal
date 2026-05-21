import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "lucide-react": path.resolve(__dirname, "src/components/icons.jsx"),
      "firebase/app": path.resolve(__dirname, "src/firebase/firebaseAppCdn.js"),
      "firebase/auth": path.resolve(__dirname, "src/firebase/firebaseAuthCdn.js"),
      "firebase/firestore": path.resolve(__dirname, "src/firebase/firebaseFirestoreCdn.js"),
    },
  },
  esbuild: {
    jsx: "automatic",
  },
});
