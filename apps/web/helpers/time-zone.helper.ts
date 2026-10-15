/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import type { IUser } from "@plane/types";

const isValidTimeZone = (timeZone: string): boolean => {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone });
    return true;
  } catch {
    return false;
  }
};

/**
 * ever-gauzy fork: Gauzy stores a user's time zone as a display label, e.g. "Europe/Paris (UTC +01:00)" or
 * "America/Sao Paulo (UTC -03:00)". `Intl.DateTimeFormat` only accepts IANA names and throws a RangeError for
 * anything else, which crashed the workspace home page. Returns the IANA time zone the value names, or
 * `undefined` when there is none (callers then use the browser's time zone).
 *
 * @param value - The stored time zone (IANA name or Gauzy label).
 */
export const toValidTimeZone = (value?: string | null): string | undefined => {
  if (!value) return undefined;
  const name = value.split(" (")[0].trim();
  return [value, name, name.replace(/ /g, "_")].find((candidate) => !!candidate && isValidTimeZone(candidate));
};

/**
 * ever-gauzy fork: the user with `user_timezone` normalized by {@link toValidTimeZone}; an unusable value
 * becomes "UTC" so no consumer can hit the RangeError.
 *
 * @param user - The user returned by the API.
 */
export const withValidTimeZone = <T extends Partial<IUser>>(user: T): T => {
  if (!user?.user_timezone) return user;
  return { ...user, user_timezone: toValidTimeZone(user.user_timezone) ?? "UTC" };
};
