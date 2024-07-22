import { validate } from "class-validator";
import { Response } from "express";

export interface IValidator {
  [k: string]: string | number | object;
}

export class ValidatorService {
  static async runValidation<T extends Object>(
    data: IValidator,
    constructor: { new (): T }
  ) {
    const instance: any = new constructor();
    Object.assign(instance, data);

    return validate(instance);
  }

  static showErrors(errors: any[], res: Response) {
    if (errors.length > 0) {
      const messageErrors: string[] = [];
      for (const error of errors) {
        if (!error.constraints) continue;
        for (const key in error.constraints) {
          messageErrors.push(error.constraints[key]);
        }
      }
      return res.status(411).json({ messages: messageErrors });
    }
  }
}
