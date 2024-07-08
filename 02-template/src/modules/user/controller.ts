import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { ValidatorService } from "../../core/validator/validator.service";
import { InsertUserApplication } from "./application/insert-user.application";
import { User } from "./domain/user";
import { InsertUserValidator } from "./infrastructure/validators/insert-user.validator";

export class UserController {
  constructor(private readonly insertApplication: InsertUserApplication) {}

  public async getAll(req: Request, res: Response) {
    //res.json(users);
  }

  public async insert(req: Request, res: Response) {
    const { name, email, password, age, gender } = req.body;
    const errors = await ValidatorService.runValidation(
      req.body,
      InsertUserValidator
    );
    ValidatorService.showErrors(errors, res);

    if (errors.length > 0) return false;

    const userId = uuidv4();
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User(userId, name, email, passwordHash, age, gender);

    const userInserted = this.insertApplication.handle(user);

    return res.json(userInserted);
  }
}
