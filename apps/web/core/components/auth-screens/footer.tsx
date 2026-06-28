/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import React from "react";

// ever-gauzy fork: the upstream marketing footer ("Join 10,000+ teams building
// with Plane" + brand logos) is intentionally removed. Per AGPL-3.0 we surface a
// link to our public fork instead.
export function AuthFooter() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-13 whitespace-nowrap text-tertiary">
        A public Plane fork —{" "}
        <a
          href="https://github.com/ever-co/ever-gauzy-plane"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline hover:cursor-pointer"
        >
          github.com/ever-co/ever-gauzy-plane
        </a>
      </span>
    </div>
  );
}
