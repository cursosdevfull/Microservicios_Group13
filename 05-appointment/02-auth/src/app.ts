import express from 'express';

import { addHealthcheck } from './core/healthcheck/healthcheck';
import { interceptorJSONResponse } from './core/interceptors/json.interceptor';
import { authRouter } from './modules/auth/routes';

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
    this.app.use(express.urlencoded({ extended: false }));
  }

  private mountInterceptors(): void {
    this.app.use(interceptorJSONResponse);
  }

  private mountHealthCheck(): void {
    addHealthcheck(this.app);
  }

  private mountRoutes(): void {
    this.app.use("/auth", authRouter);
  }

  get getApplication() {
    return this.app;
  }
}

export const app = new App().getApplication;
