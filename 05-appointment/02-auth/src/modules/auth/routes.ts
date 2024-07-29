import { Router } from 'express';

import { LoginApplication } from './application/login.application';
import { AuthController } from './controller';
import { AuthRepository } from './domain/repositories/auth.repository';
import { AuthInfrastructure } from './infrastructure/auth.infrastructure';

//import { InsertUserApplication } from "./application/insert-user.application";
//import { GetUserByEmailApplication } from "./application/login.application";
class AuthRoutes {
  private readonly router: Router;

  constructor(private readonly controller: AuthController) {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post("/login", this.controller.login.bind(this.controller));
    this.router.post(
      "/validate-token",
      this.controller.validateToken.bind(this.controller)
    );
  }

  get getRouter() {
    return this.router;
  }
}

const repository: AuthRepository = new AuthInfrastructure();
const searchUserApplication = new LoginApplication(repository);
const controller = new AuthController(searchUserApplication);

export const authRouter = new AuthRoutes(controller).getRouter;
