/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

// ui
import { Button } from "@plane/propel/button";

type TNotAnEmployeeProps = {
  email?: string;
  onSignOut: () => void;
};

/**
 * ever-gauzy fork: shown when the signed-in Gauzy user has no employee profile.
 * Ever Gauzy PM works on Gauzy employees (workspace membership, assignees, views),
 * so it is available to employees only.
 */
export function NotAnEmployee(props: TNotAnEmployeeProps) {
  const { email, onSignOut } = props;

  return (
    <div className="h-screen w-full overflow-hidden bg-surface-1">
      <div className="grid h-full place-items-center p-4">
        <div className="space-y-8 text-center">
          <div className="space-y-2">
            <h3 className="text-16 font-semibold">Employees only</h3>
            <p className="mx-auto w-1/2 text-13 text-secondary">
              Only employees can sign in to Ever Gauzy PM. Your Gauzy user{email ? ` (${email})` : ""} is not an
              employee of this organization. Ask your Gauzy administrator to add you as an employee, then sign in again.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button variant="primary" onClick={onSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
