/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import React from "react";

// ever-gauzy fork: the upstream marketing footer ("Join 10,000+ teams building
// with Plane" + brand logos) is intentionally removed. Per AGPL-3.0 we surface
// the corresponding-source notice and a link to our public fork instead.
export function AuthFooter() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-2 text-center">
      <p className="text-[11px] leading-relaxed text-tertiary">
        <a
          href="https://pm.gauzy.co"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:cursor-pointer"
        >
          Ever Gauzy PM
        </a>{" "}
        is a public fork of{" "}
        <a
          href="https://github.com/makeplane/plane"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:cursor-pointer"
        >
          Plane
        </a>
        , modified and operated by Ever Co. This service includes software licensed under the GNU AGPL v3.0. You can
        access the corresponding fork source code{" "}
        <a
          href="https://github.com/ever-co/ever-gauzy-plane"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:cursor-pointer"
        >
          here
        </a>
        . Ever Gauzy PM is not affiliated with, sponsored by, or endorsed by{" "}
        <a
          href="https://plane.so"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:cursor-pointer"
        >
          Plane
        </a>
        .
      </p>
    </div>
  );
}
