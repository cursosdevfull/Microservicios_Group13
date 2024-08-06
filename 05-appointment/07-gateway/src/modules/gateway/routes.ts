import { Router } from "express";

import { Authorization } from "../../core/middlewares/authentication";
import { ApiController } from "./controller";

class ApiRoutes {
  private readonly controller: ApiController = new ApiController();
  public readonly router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post(
      "/appointment",
      Authorization,
      this.controller.createAppointment.bind(this.controller)
    );

    this.router.post("/login", this.controller.login.bind(this.controller));

    this.router.post(
      "/register",
      this.controller.register.bind(this.controller)
    );
  }
}

export const apiRouter = new ApiRoutes().router;
