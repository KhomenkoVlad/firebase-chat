/// <reference types="vitest/config" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import mkcert from "vite-plugin-mkcert";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [tsconfigPaths(), react(), mkcert()],
    base: env.VITE_APP_BASE_PATH,
    resolve: {
      alias: {
        styles: "/src/styles",
      },
    },
    test: {
      coverage: {
        include: ["src/**"],
      },
      setupFiles: ["./test-setup.ts"],
      globals: true,
      environment: "happy-dom",
    },
    server: {
      proxy: {
        "/__/auth": {
          target: "https://" + env.VITE_FIREBASE_AUTH_DOMAIN,
          changeOrigin: true,
          secure: true,
          rewrite: path => path.replace(/^\/__\/auth/, "/__/auth"),
        },
      },
    },
  };
});
