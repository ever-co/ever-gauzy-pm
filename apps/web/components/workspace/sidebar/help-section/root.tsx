/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import React, { useState } from "react";
import { observer } from "mobx-react";
import { HelpOutline, PagesOutline } from "@makeplane/propel/icons";
import { useTranslation } from "@plane/i18n";
// ui
import { Icon } from "@makeplane/propel/components/icon";
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@makeplane/propel/components/menu";
// components
import { AppSidebarItem } from "@/components/sidebar/sidebar-item";
import { PlaneVersionNumber } from "@/components/global/version-number";
// hooks
import { usePowerK } from "@/hooks/store/use-power-k";

export const HelpMenuRoot = observer(function HelpMenuRoot() {
  // store hooks
  const { t } = useTranslation();
  const { toggleShortcutsListModal } = usePowerK();
  // states
  const [isNeedHelpOpen, setIsNeedHelpOpen] = useState(false);

  // ever-gauzy fork: Ever Gauzy PM's own help — Gauzy docs; Plane's "Contact sales", "What's new?" (Plane
  // changelog) and "Forum" entries are removed
  return (
    <>
      <Menu onOpenChange={setIsNeedHelpOpen}>
        {/* propel: `AppSidebarItem` takes no arbitrary props, so it cannot be the Base UI trigger
            — the popup would have no element to anchor to. The trigger is a plain button wearing
            the same chrome, with the item's own icon part inside it. */}
        <MenuTrigger
          render={
            <button
              type="button"
              className="group flex flex-col items-center justify-center gap-0.5 text-tertiary"
              aria-label={t("power_k.group_titles.help")}
            >
              <AppSidebarItem.Icon icon={<HelpOutline className="size-5" />} highlight={isNeedHelpOpen} />
            </button>
          }
        />
        <MenuContent
          side="bottom"
          align="end"
          footer={
            <div className="text-11 text-secondary">
              <PlaneVersionNumber />
            </div>
          }
        >
          <MenuItem
            icon={<Icon icon={PagesOutline} tint="secondary" />}
            label={t("documentation")}
            onClick={() => window.open("https://docs.gauzy.co", "_blank", "noopener,noreferrer")}
          />
          <MenuSeparator />
          <MenuItem label={t("keyboard_shortcuts")} onClick={() => toggleShortcutsListModal(true)} />
        </MenuContent>
      </Menu>
    </>
  );
});
