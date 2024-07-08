import { Router } from "express";

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
    this.router.get("/", this.controller.getAll.bind(this.controller));
    this.router.post("/", this.controller.insert.bind(this.controller));
  }

  get getRouter() {
    return this.router;
  }
}

const repository: UserRepository = new UserInfrastructure();
const application = new InsertUserApplication(repository);
const controller = new UserController(application);

export const userRouter = new UserRoutes(controller).getRouter;
