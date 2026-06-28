/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
// helpers
import { applyCustomTheme, clearCustomTheme } from "@plane/utils";
// hooks
import { useAppTheme } from "@/hooks/store/use-app-theme";
import { useRouterParams } from "@/hooks/store/use-router-params";
import { useUserProfile } from "@/hooks/store/user";
// services
import { AuthService } from "@/services/auth.service";

type TStoreWrapper = {
  children: ReactNode;
};

function StoreWrapper(props: TStoreWrapper) {
  const { children } = props;
  // ever-gauzy fork: detect a one-click SSO handoff (?sso=<gauzy token>) on first
  // mount, before any auth gating renders. Lazy init runs synchronously so children
  // (incl. the auth redirect) are blocked until the exchange + reload completes.
  const [ssoProcessing] = useState(
    () => typeof window !== "undefined" && new URLSearchParams(window.location.search).has("sso")
  );
  // theme
  const { setTheme } = useTheme();
  // router
  const params = useParams();
  // store hooks
  const { setQuery } = useRouterParams();
  const { sidebarCollapsed, toggleSidebar } = useAppTheme();
  const { data: userProfile } = useUserProfile();
  // Track if we've initialized theme from server (one-time only)
  const hasInitializedThemeRef = useRef(false);
  // Track current user to reset on logout/login
  const currentUserIdRef = useRef<string | undefined>(undefined);
  // Track previous theme to detect transitions from custom theme
  const previousThemeRef = useRef<string | undefined>(undefined);

  /**
   * Sidebar collapsed fetching from local storage
   */
  useEffect(() => {
    const localValue = localStorage && localStorage.getItem("app_sidebar_collapsed");
    const localBoolValue = localValue ? (localValue === "true" ? true : false) : false;
    if (localValue && sidebarCollapsed === undefined) toggleSidebar(localBoolValue);
  }, [sidebarCollapsed, setTheme, toggleSidebar]);

  /**
   * Effect 1: Initial theme sync from server (one-time only)
   *
   * This effect runs ONCE per user session to load theme from server.
   * After initial load, all theme changes are localStorage-driven (next-themes).
   * This prevents a feedback loop where server updates trigger UI updates in a cycle.
   */
  useEffect(() => {
    const userId = userProfile?.id;

    // Reset initialization flag when user changes (logout/login)
    // This handles both logout (userId becomes undefined) and login (userId changes)
    if (userId !== currentUserIdRef.current) {
      hasInitializedThemeRef.current = false;
      previousThemeRef.current = undefined;
      currentUserIdRef.current = userId;
    }

    // Only initialize theme from server on FIRST load for this user
    if (!userProfile?.theme?.theme || hasInitializedThemeRef.current) {
      return; // Skip if already initialized or no profile data
    }

    // Apply theme from server profile (one-time only)
    setTheme(userProfile?.theme?.theme || "system");

    // Mark as initialized - prevents future syncs from server
    hasInitializedThemeRef.current = true;
  }, [userProfile?.theme?.theme, setTheme]);

  /**
   * Effect 2: Custom theme CSS application (runs on every change)
   *
   * This effect applies or clears custom theme CSS variables whenever
   * the theme changes. It runs independently of the initial sync effect.
   */
  useEffect(() => {
    if (!userProfile?.theme?.theme) return;

    const currentTheme = userProfile?.theme?.theme;
    const previousTheme = previousThemeRef.current;
    const themeData = userProfile?.theme;

    // Apply custom theme if current theme is custom
    if (currentTheme === "custom" && themeData.primary && themeData.background && themeData.darkPalette !== undefined) {
      applyCustomTheme(themeData.primary, themeData.background, themeData.darkPalette ? "dark" : "light");
    }
    // Clear custom theme CSS when switching away from custom
    else if (previousTheme === "custom" && currentTheme !== "custom") {
      clearCustomTheme();
      // No reload needed - let CSS cascade handle it naturally
    }

    // Update previous theme for next comparison
    previousThemeRef.current = currentTheme;
  }, [userProfile?.theme]);

  useEffect(() => {
    if (!params) return;
    setQuery(params);
  }, [params, setQuery]);

  // ever-gauzy fork: SSO bridge — exchange ?sso=<gauzy token> for a Plane session
  // cookie, then reload to the cleaned URL so the new session is used. On invalid/
  // expired token we still reload (to the normal login page) as a graceful fallback.
  useEffect(() => {
    if (!ssoProcessing || typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const ssoToken = url.searchParams.get("sso");
    url.searchParams.delete("sso");
    (async () => {
      try {
        if (ssoToken) await new AuthService().exchangeSso(ssoToken);
      } catch {
        // ignore — fall through to manual login
      } finally {
        window.location.replace(url.toString());
      }
    })();
  }, [ssoProcessing]);

  if (ssoProcessing) return null;

  return <>{children}</>;
}

export default observer(StoreWrapper);
