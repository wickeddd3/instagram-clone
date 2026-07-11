import { GraphQLError } from "graphql";

/**
 * Typed GraphQL errors with stable machine-readable codes in `extensions.code`,
 * mirroring the REST error contract. Because these carry an explicit code (not
 * INTERNAL_SERVER_ERROR), formatError leaves their message intact in production.
 */
export const unauthenticatedError = (message = "Unauthorized"): GraphQLError =>
  new GraphQLError(message, { extensions: { code: "UNAUTHENTICATED" } });

export const forbiddenError = (message = "Forbidden"): GraphQLError =>
  new GraphQLError(message, { extensions: { code: "FORBIDDEN" } });
