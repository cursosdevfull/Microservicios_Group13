import { DataSource } from "typeorm";

import { IDatabaseConfig, Parameters } from "../core/parameters/parameters";
import { IBootstrap } from "./bootstrap.interface";

export class DatabaseBootstrap implements IBootstrap {
  private static appDataSource: DataSource;

  initialize(): Promise<boolean | void | DataSource> {
    const dbConfig: IDatabaseConfig = Parameters.dbConfig;
    const AppDataSource = new DataSource({ type: "mysql", ...dbConfig });

    DatabaseBootstrap.appDataSource = AppDataSource;

    return AppDataSource.initialize();
  }

  static get dataSource(): DataSource {
    return DatabaseBootstrap.appDataSource;
  }

  close() {
    DatabaseBootstrap.appDataSource?.destroy();
  }
}
