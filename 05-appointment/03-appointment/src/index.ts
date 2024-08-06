import "reflect-metadata";

import { app } from "./app";
import { BrokerBootstrap } from "./bootstrap/broker.bootstrap";
import { DatabaseBootstrap } from "./bootstrap/database.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { ListenAppointmentApplication } from "./modules/appointment/application/listen-kafka.application";
import { AppointmentInfrastructure } from "./modules/appointment/infrastructure/appointment.infrastructure";

const serverBootstrap = new ServerBootstrap(app);
const databaseBootstrap = new DatabaseBootstrap();
const kafkaBootstrap = new BrokerBootstrap();

(async () => {
  const listPromises = [
    serverBootstrap.initialize(),
    databaseBootstrap.initialize(),
    kafkaBootstrap.initialize(),
  ];

  try {
    await Promise.all(listPromises);
    const repository = new AppointmentInfrastructure();
    const application = new ListenAppointmentApplication(repository);
    await application.run();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

const shutdownBySignal = (signalName: string) => {
  return async () => {
    console.log(`Shutting down by ${signalName}`);
    if (databaseBootstrap) await databaseBootstrap.close();
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
