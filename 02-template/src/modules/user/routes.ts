import { Router } from 'express';

import { UserController } from './controller';
import { InsertUserUseCase } from './use-cases/insert';

class UserRoutes {
  private readonly router: Router;

  constructor(private readonly controller: UserController) {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.insert);
  }

  get getRouter() {
    return this.router;
  }
}

const useCase = new InsertUserUseCase();
const controller = new UserController(useCase);

export const userRouter = new UserRoutes(controller).getRouter;
