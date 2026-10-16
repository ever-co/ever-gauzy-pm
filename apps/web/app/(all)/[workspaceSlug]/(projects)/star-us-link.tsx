/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { useTheme } from "next-themes";
// assets
import githubBlackImage from "@/app/assets/logos/github-black.png?url";
import githubWhiteImage from "@/app/assets/logos/github-white.png?url";

// ever-gauzy fork: credit Plane and link to our open-source Plane integration for Gauzy (was "Star us on GitHub"
// linking to makeplane/plane)
const FORKED_FROM_PLANE_LABEL = "Forked from Plane";
const OSS_REPOSITORY_URL = "https://github.com/ever-co/ever-gauzy-plugins-plane";

export function StarUsOnGitHubLink() {
  // hooks
  const { resolvedTheme } = useTheme();
  const imageSrc = resolvedTheme === "dark" ? githubWhiteImage : githubBlackImage;

  return (
    <a
      aria-label={FORKED_FROM_PLANE_LABEL}
      className="flex flex-shrink-0 items-center gap-1.5 rounded-sm bg-layer-2 px-3 py-1.5"
      href={OSS_REPOSITORY_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={imageSrc} className="h-4 w-4 object-contain" alt="GitHub Logo" aria-hidden="true" />
      <span className="hidden text-11 font-medium sm:hidden md:block">{FORKED_FROM_PLANE_LABEL}</span>
    </a>
  );
}
