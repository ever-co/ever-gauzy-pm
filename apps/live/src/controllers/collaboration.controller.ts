/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import type { Hocuspocus } from "@hocuspocus/server";
import type { Request } from "express";
import type WebSocket from "ws";
// plane imports
import { Controller, WebSocket as WSDecorator } from "@plane/decorators";
import { logger } from "@plane/logger";
// env
import { env } from "@/env";
// lib
import { isOriginAllowed, parseAllowedOrigins } from "@/lib/origin";

@Controller("/collaboration")
export class CollaborationController {
  [key: string]: unknown;
  private readonly hocusPocusServer: Hocuspocus;
  private readonly allowedOrigins = parseAllowedOrigins(env.CORS_ALLOWED_ORIGINS);

  constructor(hocusPocusServer: Hocuspocus) {
    this.hocusPocusServer = hocusPocusServer;
  }

  @WSDecorator("/")
  handleConnection(ws: WebSocket, req: Request) {
    // ever-gauzy fork: browsers send the session cookie with any same-site WebSocket, so only accept connections
    // opened by the configured web origins (no-op when CORS_ALLOWED_ORIGINS is empty)
    if (!isOriginAllowed(req.headers.origin, this.allowedOrigins)) {
      logger.warn(`COLLABORATION_CONTROLLER: rejected WebSocket from origin ${req.headers.origin ?? "(none)"}`);
      ws.close(1008, "Origin not allowed");
      return;
    }

    try {
      // Initialize the connection with Hocuspocus
      this.hocusPocusServer.handleConnection(ws, req);

      // Set up error handling for the connection
      ws.on("error", (error: Error) => {
        logger.error("COLLABORATION_CONTROLLER: WebSocket connection error:", error);
        ws.close(1011, "Internal server error");
      });
    } catch (error) {
      logger.error("COLLABORATION_CONTROLLER: WebSocket connection error:", error);
      ws.close(1011, "Internal server error");
    }
  }
}
