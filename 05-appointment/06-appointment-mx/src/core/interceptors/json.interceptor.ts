import { NextFunction, Request, Response } from "express";

export class ErrorResponse {
  errors!: string[];
  statusCode!: number;

  constructor(errors: string[], statusCode: number) {
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

export class SuccessResponse {
  data!: any;
  statusCode!: number;

  constructor(data: any, statusCode: number) {
    this.data = data;
    this.statusCode = statusCode;
  }
}

export const interceptorJSONResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodOriginal = res.json;
  res.json = function (body) {
    let bodyResponse: SuccessResponse | ErrorResponse;

    if (res.statusCode === 200 || res.statusCode === 201) {
      bodyResponse = new SuccessResponse(body, res.statusCode);
    } else {
      bodyResponse = new ErrorResponse(body.messages, res.statusCode);
    }

    return methodOriginal.call(this, bodyResponse);
  };

  next();
};
