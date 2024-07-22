import { Router } from "express";

import { InsertUserApplication } from "./application/insert-user.application";
import { GetUserByEmailApplication } from "./application/login.application";
import { UserController } from "./controller";
import { AuthRepository } from "./domain/repositories/auth.repository";
import { AuthInfrastructure } from "./infrastructure/auth.infrastructure";

class UserRoutes {
  private readonly router: Router;

  constructor(private readonly controller: UserController) {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post("/login", this.controller.insert.bind(this.controller));
  }

  get getRouter() {
    return this.router;
  }
}

const repository: AuthRepository = new AuthInfrastructure();
const insertUser = new InsertUserApplication(repository);
const getUserByEmail = new GetUserByEmailApplication(repository);
const controller = new UserController(insertUser, getUserByEmail);

export const userRouter = new UserRoutes(controller).getRouter;
