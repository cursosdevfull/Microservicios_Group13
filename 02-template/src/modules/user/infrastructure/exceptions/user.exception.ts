import { ErrorBase } from "../../../../core/errors/error-base";

export class UserInsertDatabaseException extends ErrorBase {
  constructor(message: string, stack?: string) {
    super(message);
    this.name = "UserInsertException";
    this.status = 500;
    this.stack = stack ?? "";
  }
}
