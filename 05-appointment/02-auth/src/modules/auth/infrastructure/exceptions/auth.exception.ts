import { ErrorBase } from '../../../../core/errors/error-base';

export class AuthDatabaseException extends ErrorBase {
  constructor(message: string, name: string, stack?: string, status?: number) {
    super(message);
    this.name = name;
    this.status = status ?? 500;
    this.stack = stack ?? "";
  }
}
