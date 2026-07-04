/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
// plane imports
import { API_BASE_URL } from "@plane/constants";

import polyfills from "@/lib/polyfills";

void polyfills;

// ever-gauzy fork: one-click SSO handoff from Gauzy. If the URL carries
// ?sso=<gauzy access token>, exchange it for a Plane session cookie BEFORE the
// router hydrates — otherwise the auth gate redirects to the sign-in screen and
// the ?sso param is lost before the exchange can run. After the cookie is set we
// strip ?sso and hydrate normally, so the app boots already authenticated.
async function handleSsoHandoff(): Promise<void> {
  if (typeof window === "undefined") return;
  let url: URL;
  try {
    url = new URL(window.location.href);
  } catch {
    return;
  }
  const ssoToken = url.searchParams.get("sso");
  if (!ssoToken) return;
  try {
    await fetch(`${API_BASE_URL}/auth/sso-exchange/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: ssoToken }),
    });
  } catch {
    // ignore — fall through to normal (unauthenticated) boot
  }
  // Remove the token from the address bar regardless of exchange outcome.
  url.searchParams.delete("sso");
  window.history.replaceState({}, "", url.toString());
}

async function bootstrap(): Promise<void> {
  await handleSsoHandoff();
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <HydratedRouter />
      </StrictMode>
    );
  });
}

void bootstrap();
