import axios from 'axios';
import { err, ok, Result } from 'neverthrow';

import { ERROR_MESSAGES } from '../../../core/errors/error-base';
import { Parameters } from '../../../core/parameters/parameters';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { AuthDatabaseException } from './exceptions/auth.exception';

interface IResponseSearchUserByEmail {
  data: {
    userId: string;
    name: string;
    email: string;
    password: string;
    refreshToken: string;
  };
  statusCode: number;
}

export type AuthSearchUserByEmail = Result<
  IResponseSearchUserByEmail,
  AuthDatabaseException
>; //Result<Auth, AuthDatabaseException>;

export class AuthInfrastructure implements AuthRepository {
  async searchUserByEmail(email: string): Promise<AuthSearchUserByEmail> {
    try {
      const response = await axios.post(
        `${Parameters.USER_BACKEND}/user/get-by-email`,
        { email }
      );
      return ok(response.data);
    } catch (error: any) {
      return err(
        new AuthDatabaseException(
          "Error to search user by email",
          ERROR_MESSAGES.AUTH_LOGIN,
          error.response.data.errors,
          error.response.data.statusCode
        )
      );
    }
  }

  /*async login(Auth: Auth): Promise<AuthLoginResult> {
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
  }*/
}
