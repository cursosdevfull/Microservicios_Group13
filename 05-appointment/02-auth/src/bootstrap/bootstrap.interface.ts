export interface IBootstrap {
  initialize(): Promise<boolean | void>;
}
