import "reflect-metadata";

import dotenv from "dotenv";

import { app } from "./app";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

dotenv.config();

const serverBootstrap = new ServerBootstrap(app);

(async () => {
  const listPromises = [serverBootstrap.initialize()];

  try {
    await Promise.all(listPromises);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

const shutdownBySignal = (signalName: string) => {
  return () => {
    console.log(`Shutting down by ${signalName}`);
    if (serverBootstrap) {
      serverBootstrap.getServer.close(() => {
        console.log("Server is closed");
        process.exit(0);
      });
    }

    setTimeout(() => {
      console.error(
        "Could not close connections in time, forcefully shutting down"
      );
      process.exit(1);
    }, 5000);
  };
};

/* process
  .on("SIGINT", shutdownBySignal("SIGINT"))
  .on("SIGTERM", shutdownBySignal("SIGTERM"))
  .on("SIGQUIT", shutdownBySignal("SIGQUIT"))
  .on("SIGBREAK", shutdownBySignal("SIGBREAK"))
  .on("SIGHUP", shutdownBySignal("SIGHUP"))
  .on("SIGUSR2", shutdownBySignal("SIGUSR2"))
  .on("SIGABRT", shutdownBySignal("SIGABRT"))
  .on("SIGILL", shutdownBySignal("SIGILL"))
  .on("exit", shutdownBySignal("exit"))
  .on("uncaughtException", shutdownBySignal("uncaughtException"))
  .on("unhandledRejection", shutdownBySignal("unhandledRejection")); */
