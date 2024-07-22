import express from "express";
import http from "node:http";
import { AddressInfo } from "node:net";

import { Parameters } from "../core/parameters/parameters";
import { IBootstrap } from "./bootstrap.interface";

export class ServerBootstrap implements IBootstrap {
  private instanceServer!: http.Server;

  constructor(private readonly app: express.Application) {}

  async initialize(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      server
        .listen(Parameters.port)
        .on("listening", () => {
          this.instanceServer = server;
          console.log(
            `Server is running on port ${
              (server.address() as AddressInfo).port
            }`
          );
          resolve(true);
        })
        .on("error", (error: NodeJS.ErrnoException) => {
          if (error.syscall !== "listen") {
            reject(error);
          }

          switch (error.code) {
            case "EACCES":
              console.error("Port requires elevated privileges");
              process.exit(1);
              break;
            case "EADDRINUSE":
              console.error("Port is already in use");
              process.exit(1);
              break;
            default:
              reject(error);
          }
        });
    });
  }

  get getServer(): http.Server {
    return this.instanceServer;
  }
}
