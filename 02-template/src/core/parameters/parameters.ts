export class Parameters {
  static get port() {
    return process.env.PORT ? Number(process.env.PORT) : 3000;
  }
}
