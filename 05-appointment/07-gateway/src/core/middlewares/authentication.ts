import { NextFunction, Request, Response } from "express";

import { ApiApplication } from "../../modules/gateway/application/api.application";
import { Parameters } from "../parameters/parameters";

async function validateToken(token: string) {
  const application = new ApiApplication();
  const response = await application.callEndpoint(
    Parameters.urlServiceValidateToken,
    "post",
    { accessToken: token }
  );
  if (response.statusCode !== 200) {
    throw new Error("Invalid token");
  } else {
    return response.data.validate;
  }
}

export async function Authorization(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ message: "Token not provided" });
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return response.status(401).json({ message: "Token malformatted" });
  }

  if (token.trim() === "") {
    return response.status(401).json({ message: "Invalid token" });
  }

  const isValid = await validateToken(token);

  if (isValid) {
    next();
  } else {
    return response.status(401).json({ message: "Invalid token" });
  }
}
