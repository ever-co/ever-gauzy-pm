/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { describe, expect, it } from "vitest";
import { isOriginAllowed, parseAllowedOrigins } from "@/lib/origin";

describe("parseAllowedOrigins", () => {
  it("returns an empty list for an unset or blank value", () => {
    expect(parseAllowedOrigins(undefined)).toEqual([]);
    expect(parseAllowedOrigins("")).toEqual([]);
    expect(parseAllowedOrigins(" , ")).toEqual([]);
  });

  it("trims entries and trailing slashes", () => {
    expect(parseAllowedOrigins(" https://pm.gauzy.co/ ,https://pmstage.gauzy.co")).toEqual([
      "https://pm.gauzy.co",
      "https://pmstage.gauzy.co",
    ]);
  });
});

describe("isOriginAllowed", () => {
  const allowed = parseAllowedOrigins("https://pm.gauzy.co");

  it("allows everything when no allowlist is configured", () => {
    expect(isOriginAllowed(undefined, [])).toBe(true);
    expect(isOriginAllowed("https://evil.example", [])).toBe(true);
  });

  it("allows a listed origin", () => {
    expect(isOriginAllowed("https://pm.gauzy.co", allowed)).toBe(true);
    expect(isOriginAllowed("https://pm.gauzy.co/", allowed)).toBe(true);
  });

  it("rejects unlisted, look-alike and missing origins", () => {
    expect(isOriginAllowed("https://app.gauzy.co", allowed)).toBe(false);
    expect(isOriginAllowed("https://pm.gauzy.co.evil.example", allowed)).toBe(false);
    expect(isOriginAllowed("http://pm.gauzy.co", allowed)).toBe(false);
    expect(isOriginAllowed(undefined, allowed)).toBe(false);
    expect(isOriginAllowed("", allowed)).toBe(false);
    expect(isOriginAllowed(["https://pm.gauzy.co"], allowed)).toBe(false);
  });
});
