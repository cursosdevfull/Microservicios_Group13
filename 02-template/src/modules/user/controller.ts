import { Request, Response } from 'express';

import { users } from './data/user.data';
import { InsertUserUseCase } from './use-cases/insert';

export class UserController {
  constructor(private readonly insertUseCase: InsertUserUseCase) {}

  public async getAll(req: Request, res: Response) {
    res.json(users);
  }

  public async insert(req: Request, res: Response) {
    const { name, email } = req.body;

    const user = this.insertUseCase.handle(name, email);

    /* const emailFound = users.some((user) => user.email === email);
    if (!emailFound) {
      const id = users.length + 1;
      users.push({ id, name, email });
      return res.status(201).json({ id, name, email });
    }

    return res.status(400).json({ message: "Email already in use" }); */
  }
}
