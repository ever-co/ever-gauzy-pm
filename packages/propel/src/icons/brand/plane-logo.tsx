/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import * as React from "react";

import type { ISvgIcons } from "../type";
import { EverGauzyPmLogo } from "./ever-gauzy-pm-logo";

// ever-gauzy fork: rebranded to the Gauzy logo (Ever Gauzy PM).
export function PlaneLogo(props: ISvgIcons) {
  return <EverGauzyPmLogo {...props} />;
}
