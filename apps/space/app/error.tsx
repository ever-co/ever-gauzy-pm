/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

// ui
import { Button } from "@makeplane/propel/components/button";

function ErrorPage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="grid h-screen place-items-center bg-surface-1 p-4">
      <div className="space-y-8 text-center">
        <div className="space-y-2">
          <h3 className="text-16 font-semibold">Yikes! That doesn{"'"}t look good.</h3>
          <p className="mx-auto text-13 text-secondary md:w-1/2">
            Ever Gauzy PM hit an unexpected error. No worries, though. Our engineers have been notified. If you have
            more details, please write to{" "}
            <a href="mailto:gauzy@ever.co" className="text-accent-primary">
              gauzy@ever.co
            </a>{" "}
            or check our{" "}
            <a
              href="https://status.gauzy.co/"
              target="_blank"
              className="text-accent-primary"
              rel="noopener noreferrer"
            >
              Status Page
            </a>
            .
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button variant="primary" size="md" stretch="auto" label="Refresh" onClick={handleRetry} />
          {/* <Button variant="secondary" size="lg" onClick={() => {}}>
            Sign out
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
