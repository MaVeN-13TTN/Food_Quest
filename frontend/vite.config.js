import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin([
      "VITE_APP_BACKEND_URL",
      "VITE_APP_API_BASE_URL",
      "VITE_APP_API_KEY",
    ]),
  ],
});
