import { Router } from "express";

import { GetUserByEmailApplication } from "./application/get-user-by-email.application";
import { InsertUserApplication } from "./application/insert-user.application";
import { UserController } from "./controller";
import { UserRepository } from "./domain/repositories/user.repository";
import { UserInfrastructure } from "./infrastructure/user.infrastructure";

class UserRoutes {
  private readonly router: Router;

  constructor(private readonly controller: UserController) {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post("/", this.controller.insert.bind(this.controller));
    this.router.post(
      "/get-by-email",
      this.controller.getByEmail.bind(this.controller)
    );
  }

  get getRouter() {
    return this.router;
  }
}

const repository: UserRepository = new UserInfrastructure();
const insertUser = new InsertUserApplication(repository);
const getUserByEmail = new GetUserByEmailApplication(repository);
const controller = new UserController(insertUser, getUserByEmail);

export const userRouter = new UserRoutes(controller).getRouter;
