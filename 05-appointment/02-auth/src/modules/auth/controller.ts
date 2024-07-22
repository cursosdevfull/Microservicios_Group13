import { Request, Response } from "express";

import { ErrorBase } from "../../core/errors/error-base";
import { ValidatorService } from "../../core/validator/validator.service";
import { LoginValidator } from "./infrastructure/validators/get-user-by-email.validator";

export class AuthController {
  constructor(private readonly loginApplication: LoginApplication) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const errors = await ValidatorService.runValidation(
      req.body,
      LoginValidator
    );
    ValidatorService.showErrors(errors, res);

    if (errors.length > 0) return false;

    const userFound = await this.loginApplication.handle(email);

    if (userFound instanceof ErrorBase) {
      return res.status(userFound.status).json({ messages: userFound.stack });
    }

    return res.json(userFound);
  }
}
