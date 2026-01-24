import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// export default defineConfig({
//   const env = loadEnv(mode, process.cwd(), '');
//   return {
//   plugins: [react(), tailwindcss()],
//   server: {
//     proxy: {
//       "/api": {
//         // In Docker, use the SERVICE NAME of your backend (e.g., 'http://backend:3000')
//         // If running locally outside Docker, use 'http://localhost:3000'
//         target: "http://localhost:3000",
//         changeOrigin: true,
//         secure: false,
//       },
//     },},
//   },
// });

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` (e.g., .env.development)
  // The third parameter '' allows loading variables without the VITE_ prefix if needed
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: env.BACKEND_SERVER_URL || "http://server:3000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
