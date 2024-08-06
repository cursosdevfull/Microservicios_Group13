import { DataSource } from "typeorm";

export interface IBootstrap {
  initialize(): Promise<boolean | void | DataSource>;
}
