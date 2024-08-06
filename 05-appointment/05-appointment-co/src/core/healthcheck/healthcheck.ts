import express, { Request, Response } from 'express';

export const addHealthcheck = (app: express.Application) => {
  app.get("/health", (req: Request, res: Response) => {
    res.json({ message: "Server is running" });
  });
};
