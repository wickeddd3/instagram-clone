import { env } from "@/shared/config";

/**
 * Error thrown for a non-2xx REST response. `message` is the human-readable
 * reason surfaced by the backend's error envelope ({ error: { code, message,
 * details } }), preferring the first field-level detail when present.
 */
export class ApiError extends Error {
  readonly code?: string;
  readonly status: number;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

interface ErrorEnvelope {
  error?: {
    code?: string;
    message?: string;
    details?: { field: string; message: string }[];
  };
}

/**
 * POSTs JSON to the backend REST API and returns the parsed `data` payload.
 * Throws an ApiError carrying the backend's message on any non-2xx response.
 */
export const apiPost = async <T>(path: string, body: unknown): Promise<T> => {
  const response = await fetch(`${env.VITE_REST_API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const envelope = payload as ErrorEnvelope | null;
    const message =
      envelope?.error?.details?.[0]?.message ??
      envelope?.error?.message ??
      "Something went wrong. Please try again.";
    throw new ApiError(message, response.status, envelope?.error?.code);
  }

  return (payload as { data: T }).data;
};
