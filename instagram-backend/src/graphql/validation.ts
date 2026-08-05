import { ZodError, type ZodType } from "zod";
import { badUserInputError, type FieldIssue } from "@/graphql/errors";

/** Flatten zod failures into a client-safe field/message list. */
const toIssues = (error: ZodError): FieldIssue[] =>
  error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

/**
 * Parse mutation arguments against a zod schema at the resolver boundary. On
 * success the cleaned value is returned (unknown keys stripped, strings trimmed
 * per the schema); on failure a typed BAD_USER_INPUT GraphQL error is thrown so
 * the client sees which fields were rejected. Mirrors the REST `validate`
 * middleware, since GraphQL has no equivalent request-level hook.
 */
export const validateInput = <T>(schema: ZodType<T>, input: unknown): T => {
  const result = schema.safeParse(input);
  if (!result.success) {
    throw badUserInputError("Validation failed", toIssues(result.error));
  }
  return result.data;
};
