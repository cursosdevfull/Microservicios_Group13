import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { ErrorBase } from '../../core/errors/error-base';
import { ValidatorService } from '../../core/validator/validator.service';
import { GetUserByEmailApplication } from './application/get-user-by-email.application';
import { InsertUserApplication } from './application/insert-user.application';
import { UserProperties } from './domain/user';
import { UserFactory } from './domain/user.factory';
import { GetUserByEmailValidator } from './infrastructure/validators/get-user-by-email.validator';
import { InsertUserValidator } from './infrastructure/validators/insert-user.validator';

export class UserController {
  constructor(
    private readonly insertApplication: InsertUserApplication,
    private readonly getUserByEmailApplication: GetUserByEmailApplication
  ) {}

  public async getByEmail(req: Request, res: Response) {
    const { email } = req.body;
    console.log("req.body", req.body);
    const errors = await ValidatorService.runValidation(
      req.body,
      GetUserByEmailValidator
    );
    ValidatorService.showErrors(errors, res);

    if (errors.length > 0) return false;

    const userFound = await this.getUserByEmailApplication.handle(email);

    if (userFound instanceof ErrorBase) {
      return res.status(userFound.status).json({ messages: userFound.stack });
    }

    console.log("userFound", userFound);

    return res.json(userFound);
  }

  public async insert(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const errors = await ValidatorService.runValidation(
      req.body,
      InsertUserValidator
    );
    ValidatorService.showErrors(errors, res);

    if (errors.length > 0) return false;

    const userId = uuidv4();
    const passwordHash = await bcrypt.hash(password, 10);
    const props: UserProperties = {
      userId,
      name,
      email,
      password: passwordHash,
      roles: ["user"],
    };
    const user = UserFactory.create(props);

    const userInserted = await this.insertApplication.handle(user);

    if (userInserted instanceof ErrorBase) {
      return res.status(500).json({ messages: userInserted.stack });
    }

    return res.json(userInserted);
  }
}
