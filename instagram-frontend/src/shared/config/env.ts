import { z } from "zod";

// Single, validated source for the app's build-time environment. Vite inlines
// `import.meta.env.VITE_*` at build, so a missing/blank var otherwise surfaces as
// an opaque runtime failure (undefined URL → broken requests). Parsing here fails
// fast at startup with a readable message, mirroring the backend's envalid config.
const envSchema = z.object({
  VITE_API_URL: z.url(),
  VITE_SUPABASE_URL: z.url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, "VITE_SUPABASE_ANON_KEY is required"),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(`Invalid environment variables:\n${issues}`);
}

export const env = parsed.data;
