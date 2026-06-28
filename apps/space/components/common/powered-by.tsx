/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

type TPoweredBy = {
  disabled?: boolean;
};

// ever-gauzy fork: the upstream "Powered by Plane Publish" badge is intentionally
// removed. The export + signature are kept so existing imports still compile.
export function PoweredBy(_props: TPoweredBy) {
  return null;
}
