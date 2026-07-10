/** Structured, client-safe error context (e.g. per-field validation issues). */
export interface ErrorDetail {
  field: string;
  message: string;
}

/**
 * Base class for expected ("operational") errors that map to an HTTP status and
 * a stable machine-readable code. Anything that isn't an AppError is treated as
 * an unexpected 500 and its details are hidden from clients in production.
 * `details` carries optional structured context surfaced in the error envelope.
 */
export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly isOperational: boolean;
  readonly details?: ErrorDetail[];

  constructor(
    message: string,
    statusCode = 500,
    code = "INTERNAL_ERROR",
    isOperational = true,
    details?: ErrorDetail[],
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request", details?: ErrorDetail[]) {
    super(message, 400, "BAD_REQUEST", true, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, "FORBIDDEN");
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, 404, "NOT_FOUND");
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409, "CONFLICT");
  }
}
