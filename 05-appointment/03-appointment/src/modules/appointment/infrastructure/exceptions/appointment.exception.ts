import { ErrorBase } from "../../../../core/errors/error-base";

export class AppointmentDatabaseException extends ErrorBase {
  constructor(message: string, name: string, stack?: string) {
    super(message);
    this.name = name;
    this.status = 500;
    this.stack = stack ?? "";
  }
}

export class AppointmentNotFoundException extends ErrorBase {
  constructor(message: string, name: string, stack?: string) {
    super(message);
    this.name = name;
    this.status = 404;
    this.stack = stack ?? "";
  }
}
