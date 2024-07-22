import { err, Result } from "neverthrow";

import { ERROR_MESSAGES } from "../../../core/errors/error-base";
import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { AuthDatabaseException } from "./exceptions/auth.exception";

export type AuthLoginResult = Result<Auth, AuthDatabaseException>;

export class AuthInfrastructure implements AuthRepository {
  async login(Auth: Auth): Promise<AuthLoginResult> {
    try {
      const response = await fetch("http://localhost:3000/user/get-by/email", {
        method: "POST",
        body: JSON.stringify({ email: Auth.properties.email }),
      }).then((res) => res.json());
      console.log("response", response);
    } catch (error: any) {
      return err(
        new AuthDatabaseException(
          "Error to auth login",
          ERROR_MESSAGES.AUTH_LOGIN,
          error.stack
        )
      );
    }
  }
}
