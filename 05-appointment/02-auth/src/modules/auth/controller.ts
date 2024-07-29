import { Request, Response } from 'express';

import { ErrorBase } from '../../core/errors/error-base';
import { ValidatorService } from '../../core/validator/validator.service';
import { LoginApplication } from './application/login.application';
import { TokenService } from './infrastructure/service/token.service';
import { LoginValidator } from './infrastructure/validators/get-user-by-email.validator';
import { ValidateTokenValidator } from './infrastructure/validators/validate-token.validator';

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

    const userFound = await this.loginApplication.handle(email, password);

    if (userFound instanceof ErrorBase) {
      return res.status(userFound.status).json({ messages: userFound.stack });
    }

    if (!userFound.result) {
      return res.status(403).json({ messages: "Invalid email or password" });
    }

    return res.json({
      accessToken: TokenService.generateAccessToken(userFound.name),
      refreshToken: userFound.refreshToken,
    });
  }

  public async validateToken(req: Request, res: Response) {
    const { accessToken } = req.body;

    const errors = await ValidatorService.runValidation(
      req.body,
      ValidateTokenValidator
    );
    ValidatorService.showErrors(errors, res);

    if (errors.length > 0) return false;

    const validateToken = TokenService.validateToken(accessToken);
    console.log(validateToken);

    res.json({ validate: validateToken ? true : false });
  }
}
