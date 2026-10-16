/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { useTheme } from "next-themes";
// plane imports
import { Button } from "@makeplane/propel/components/button";
// assets
import maintenanceModeDarkModeImage from "@/app/assets/instance/maintenance-mode-dark.svg?url";
import maintenanceModeLightModeImage from "@/app/assets/instance/maintenance-mode-light.svg?url";
// layouts
import DefaultLayout from "@/layouts/default-layout";

// ever-gauzy fork: Ever Gauzy PM's own support, status page and X account (not Plane's)
const linkMap = [
  {
    key: "mail_to",
    label: "Contact Support",
    value: "mailto:gauzy@ever.co",
  },
  {
    key: "status",
    label: "Status Page",
    value: "https://status.gauzy.co/",
  },
  {
    key: "twitter_handle",
    label: "@everplatform",
    value: "https://x.com/everplatform",
  },
];

// Production Error Component
interface ProdErrorComponentProps {
  error?: unknown;
  onGoHome: () => void;
}

// ever-gauzy fork: a short, reportable description of the error (message + top of the stack)
const describeError = (error: unknown): string | undefined => {
  if (error instanceof Error) {
    const stack = (error.stack ?? "").split("\n").slice(1, 6).join("\n");
    return stack ? `${error.name}: ${error.message}\n${stack}` : `${error.name}: ${error.message}`;
  }
  if (error && typeof error === "object" && "status" in error) {
    const { status, statusText } = error as { status?: number; statusText?: string };
    return `${status ?? ""} ${statusText ?? ""}`.trim() || undefined;
  }
  return error ? String(error) : undefined;
};

export function ProdErrorComponent({ error, onGoHome }: ProdErrorComponentProps) {
  // hooks
  const { resolvedTheme } = useTheme();

  // derived values
  const maintenanceModeImage = resolvedTheme === "dark" ? maintenanceModeDarkModeImage : maintenanceModeLightModeImage;
  const errorDetails = describeError(error);

  return (
    <DefaultLayout>
      <div className="relative container mx-auto flex h-full w-full max-w-xl flex-col items-center justify-center gap-2 gap-y-6 bg-surface-1 px-6 text-center">
        <div className="relative w-full">
          <img
            src={maintenanceModeImage}
            height="176"
            width="288"
            alt="ProjectSettingImg"
            className="h-full w-full object-fill object-center"
          />
        </div>
        <div className="relative mt-4 flex w-full flex-col gap-4">
          <div className="flex flex-col gap-2.5">
            <h1 className="text-left text-18 font-semibold text-primary">&#x1F6A7; Looks like something went wrong!</h1>
            <span className="text-left text-14 font-medium text-secondary">
              We track these errors automatically and working on getting things back up and running. If the problem
              persists feel free to contact us. In the meantime, try refreshing.
            </span>
          </div>

          <div className="mt-1 flex items-center justify-start gap-6">
            {linkMap.map((link) => (
              <div key={link.key}>
                <a
                  href={link.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-13 text-accent-primary hover:underline"
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>

          {errorDetails && (
            <details className="text-left text-12 text-tertiary">
              <summary className="cursor-pointer">Error details (include them when you contact support)</summary>
              <pre className="mt-2 max-h-48 overflow-auto rounded-md bg-layer-1 p-2 break-words whitespace-pre-wrap">
                {errorDetails}
              </pre>
            </details>
          )}

          <div className="flex items-center justify-start gap-6">
            <Button variant="primary" size="md" stretch="auto" label="Go to home" onClick={onGoHome} />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
