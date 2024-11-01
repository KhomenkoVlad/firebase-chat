import { defineConfig } from "cypress";
import "dotenv/config";

export default defineConfig({
  env: {
    ...process.env,
  },
  e2e: {
    baseUrl: "https://localhost:5173",
  },
});
