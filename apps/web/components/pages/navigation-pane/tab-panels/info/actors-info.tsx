/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { observer } from "mobx-react";
import Link from "next/link";
import { useParams } from "next/navigation";
// plane imports
import { Avatar } from "@makeplane/propel/components/avatar";
import { useTranslation } from "@plane/i18n";
import { calculateTimeAgoShort, getFileURL, renderFormattedDate } from "@plane/utils";
// hooks
import { useMember } from "@/hooks/store/use-member";
// store
import type { TPageInstance } from "@/store/pages/base-page";

type Props = {
  page: TPageInstance;
};

// ever-gauzy fork: a page can have no known creator/editor; linking then went to /<workspace>/profile/null
function ActorLink({
  workspaceSlug,
  userId,
  children,
}: {
  workspaceSlug: string | undefined;
  userId: string | null | undefined;
  children: React.ReactNode;
}) {
  if (!workspaceSlug || !userId) return <span className="flex items-center gap-1">{children}</span>;
  return (
    <Link href={`/${workspaceSlug}/profile/${userId}`} className="flex items-center gap-1">
      {children}
    </Link>
  );
}

export const PageNavigationPaneInfoTabActorsInfo = observer(function PageNavigationPaneInfoTabActorsInfo(props: Props) {
  const { page } = props;
  // navigation
  const { workspaceSlug } = useParams();
  // store hooks
  const { getUserDetails } = useMember();
  // derived values
  const { owned_by, updated_by } = page;
  const editorInformation = updated_by ? getUserDetails(updated_by) : undefined;
  const creatorInformation = owned_by ? getUserDetails(owned_by) : undefined;
  // translation
  const { t } = useTranslation();

  return (
    <div className="mt-4 space-y-3">
      <div>
        <p className="text-11 font-medium text-tertiary">{t("page_navigation_pane.tabs.info.actors_info.edited_by")}</p>
        <div className="mt-2 flex items-center justify-between gap-2 text-13 font-medium">
          <ActorLink workspaceSlug={workspaceSlug?.toString()} userId={page.updated_by}>
            <Avatar
              alt={editorInformation?.display_name}
              fallback={editorInformation?.display_name?.[0]?.toUpperCase()}
              src={getFileURL(editorInformation?.avatar_url ?? "")}
              size="2xs"
            />
            <span>{editorInformation?.display_name ?? t("common.deactivated_user")}</span>
          </ActorLink>
          <span className="flex-shrink-0 text-tertiary">{calculateTimeAgoShort(page.updated_at ?? "")} ago</span>
        </div>
      </div>
      <div>
        <p className="text-11 font-medium text-tertiary">
          {t("page_navigation_pane.tabs.info.actors_info.created_by")}
        </p>
        <div className="mt-2 flex items-center justify-between gap-2 text-13 font-medium">
          <ActorLink workspaceSlug={workspaceSlug?.toString()} userId={page.created_by}>
            <Avatar
              alt={creatorInformation?.display_name}
              fallback={creatorInformation?.display_name?.[0]?.toUpperCase()}
              src={getFileURL(creatorInformation?.avatar_url ?? "")}
              size="2xs"
            />
            <span>{creatorInformation?.display_name ?? t("common.deactivated_user")}</span>
          </ActorLink>
          <span className="flex-shrink-0 text-tertiary">{renderFormattedDate(page.created_at)}</span>
        </div>
      </div>
    </div>
  );
});
