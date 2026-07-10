import type { Request } from "express";
import { z } from "zod";
import { BadRequestError } from "../../errors/app.error";

/**
 * Parse-and-return helpers rather than mutating middleware: Express 5 exposes
 * `req.query` as a read-only getter, so validated values are returned to the
 * controller (fully typed) instead of being written back onto the request.
 * A schema failure becomes a 400 BadRequestError with a flat field->message map.
 */
const parse = <T>(schema: z.ZodType<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const summary = result.error.issues
      .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("; ");
    throw new BadRequestError(summary || "Invalid request");
  }
  return result.data;
};

export const parseParams = <T>(req: Request, schema: z.ZodType<T>): T => parse(schema, req.params);
export const parseQuery = <T>(req: Request, schema: z.ZodType<T>): T => parse(schema, req.query);
export const parseBody = <T>(req: Request, schema: z.ZodType<T>): T => parse(schema, req.body);
