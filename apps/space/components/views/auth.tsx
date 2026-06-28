/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

// components
import { AuthRoot } from "@/components/account/auth-forms";
import { PoweredBy } from "@/components/common/powered-by";
// local imports
import { AuthHeader } from "./header";

// ever-gauzy fork: AGPL-3.0 corresponding-source notice for our public Plane fork.
function AgplNotice() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center pb-2 text-center">
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
        <a href="https://plane.so" target="_blank" rel="noopener noreferrer" className="underline hover:cursor-pointer">
          Plane
        </a>
        .
      </p>
    </div>
  );
}

export function AuthView() {
  return (
    <div className="relative z-10 flex h-screen w-screen flex-col items-center overflow-hidden overflow-y-auto bg-surface-1 px-8 pt-6 pb-10">
      <AuthHeader />
      <AuthRoot />
      <PoweredBy />
      <AgplNotice />
    </div>
  );
}
