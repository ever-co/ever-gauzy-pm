/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { useEffect } from "react";
// hooks
import { useAppRouter } from "@/hooks/use-app-router";
// layouts
import { DevErrorComponent } from "./dev";
import { ProdErrorComponent } from "./prod";

export function CustomErrorComponent({ error }: { error: unknown }) {
  // router
  const router = useAppRouter();

  const handleGoHome = () => router.push("/");
  const handleReload = () => window.location.reload();

  // ever-gauzy fork: keep the crash visible in the console in production too
  useEffect(() => {
    console.error("[Ever Gauzy PM] Unhandled error", error);
  }, [error]);

  if (import.meta.env.DEV) {
    return <DevErrorComponent error={error} onGoHome={handleGoHome} onReload={handleReload} />;
  }

  return <ProdErrorComponent error={error} onGoHome={handleGoHome} />;
}
