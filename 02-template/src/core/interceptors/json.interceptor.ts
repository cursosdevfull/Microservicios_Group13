import { NextFunction, Request, Response } from 'express';

export const interceptorJSONResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodOriginal = res.json;
  res.json = function (body) {
    const bodyResponse = {
      data: body,
      statusCode: res.statusCode,
    };

    return methodOriginal.call(this, bodyResponse);
  };

  next();
};
