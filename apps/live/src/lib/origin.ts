/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

const stripTrailingSlashes = (value: string): string => {
  let end = value.length;
  while (end > 0 && value[end - 1] === "/") end--;
  return value.slice(0, end);
};

/**
 * ever-gauzy fork: parses a comma-separated origin list (e.g. CORS_ALLOWED_ORIGINS), dropping blanks and trailing
 * slashes.
 *
 * @param value - The comma-separated list.
 */
export const parseAllowedOrigins = (value?: string | null): string[] =>
  (value ?? "")
    .split(",")
    .map((origin) => stripTrailingSlashes(origin.trim()))
    .filter((origin) => origin.length > 0);

/**
 * ever-gauzy fork: whether a request `Origin` header is allowed. An empty allowlist allows every origin (the
 * upstream behaviour); otherwise the origin must match an entry exactly (browsers send `scheme://host[:port]`, never a
 * path or trailing slash), and a missing origin is rejected.
 *
 * @param origin - The request's `Origin` header.
 * @param allowedOrigins - The allowlist, from {@link parseAllowedOrigins}.
 */
export const isOriginAllowed = (origin: string | string[] | undefined, allowedOrigins: string[]): boolean => {
  if (allowedOrigins.length === 0) return true;
  if (typeof origin !== "string" || origin.length === 0) return false;
  return allowedOrigins.includes(origin);
};
