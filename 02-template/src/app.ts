import express from 'express';

import { addHealthcheck } from './core/healthcheck/healthcheck';
import { interceptorJSONResponse } from './core/interceptors/json.interceptor';
import { userRouter } from './modules/user/routes';

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.mountMiddlewares();
    this.mountInterceptors();
    this.mountHealthCheck();
    this.mountRoutes();
  }

  private mountMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private mountInterceptors(): void {
    this.app.use(interceptorJSONResponse);
  }

  private mountHealthCheck(): void {
    addHealthcheck(this.app);
  }

  private mountRoutes(): void {
    this.app.use("/user", userRouter);
  }

  get getApplication() {
    return this.app;
  }
}

export const app = new App().getApplication;
