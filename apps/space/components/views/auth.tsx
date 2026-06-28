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

export function AuthView() {
  return (
    <div className="relative z-10 flex h-screen w-screen flex-col items-center overflow-hidden overflow-y-auto bg-surface-1 px-8 pt-6 pb-10">
      <AuthHeader />
      <AuthRoot />
      <PoweredBy />
      {/* ever-gauzy fork: AGPL-3.0 attribution to our public Plane fork */}
      <div className="flex items-center justify-center pb-2">
        <span className="text-xs text-tertiary">
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
    </div>
  );
}
