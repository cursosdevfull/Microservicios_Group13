import * as jwt from 'jsonwebtoken';

import { Parameters } from '../../../../core/parameters/parameters';

export class TokenService {
  static generateAccessToken(name: string) {
    return jwt.sign({ name }, Parameters.ACCESS_TOKEN_SECRET, {
      expiresIn: Parameters.TOKEN_EXPIRATION,
    });
  }

  static validateToken(token: string): jwt.JwtPayload {
    try {
      return jwt.verify(
        token,
        Parameters.ACCESS_TOKEN_SECRET
      ) as jwt.JwtPayload;
    } catch (error) {
      return null;
    }
  }
}
