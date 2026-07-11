import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Bundle analysis: run `ANALYZE=1 yarn build` to generate and open the report
    ...(process.env.ANALYZE
      ? [
          visualizer({
            open: true, // Automatically opens the report in your browser
            filename: "stats.html", // The name of the generated file
            gzipSize: true, // Shows how big the file is after compression
            brotliSize: true,
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      // This maps the '@' symbol to 'src' folder
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Listen on all local IPs
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          // First path segment after node_modules — the package (or @scope).
          const pkg = id.split("node_modules/")[1].split("/")[0];

          // Heavy libs used only by lazy routes/widgets. Left ungrouped so
          // Rollup keeps them in the page chunk that imports them instead of an
          // eager vendor bundle.
          const LAZY_PACKAGES = ["react-virtuoso", "swiper", "date-fns"];
          if (LAZY_PACKAGES.includes(pkg)) return undefined;

          // Group the tightly-coupled, eagerly-loaded families into a few stable
          // chunks. Grouping coupled deps together (e.g. apollo + graphql) avoids
          // cross-chunk init cycles, and these change far less often than app
          // code, so they stay cached across deploys.
          const VENDOR_GROUPS: Record<string, string[]> = {
            "react-vendor": ["react", "react-dom", "react-router", "react-router-dom", "scheduler"],
            "apollo-vendor": ["@apollo", "graphql", "graphql-tag", "@wry", "optimism", "rxjs"],
            "supabase-vendor": ["@supabase"],
            "motion-vendor": ["framer-motion", "motion-dom", "motion-utils"],
            "form-vendor": ["react-hook-form", "@hookform", "zod"],
          };
          for (const [group, packages] of Object.entries(VENDOR_GROUPS)) {
            if (packages.includes(pkg)) return group;
          }

          // Remaining shared helpers (tslib, sonner, lucide-react, clsx, …).
          return "vendor";
        },
      },
    },
  },
});
