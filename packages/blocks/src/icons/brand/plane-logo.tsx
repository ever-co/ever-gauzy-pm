/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import * as React from "react";

import { EverGauzyPmLogo } from "./ever-gauzy-pm-logo";

export type PlaneLogoProps = React.ComponentPropsWithoutRef<"svg">;

// ever-gauzy fork: rebranded to the Gauzy logo (Ever Gauzy PM).
export function PlaneLogo(props: PlaneLogoProps) {
  return <EverGauzyPmLogo {...props} />;
}
