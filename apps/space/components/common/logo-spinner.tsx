/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

// ever-gauzy fork: loading indicator shows the Ever Gauzy PM logo (theme-aware
// via currentColor) instead of the upstream Plane logo GIFs.
import { PlaneLockup } from "@plane/propel/icons";

export function LogoSpinner() {
  return (
    <div className="flex items-center justify-center">
      <PlaneLockup className="h-6 w-auto animate-pulse text-primary sm:h-11" />
    </div>
  );
}
