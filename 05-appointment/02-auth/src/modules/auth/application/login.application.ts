import * as bcrypt from 'bcryptjs';

import { ErrorBase } from '../../../core/errors/error-base';
import { AuthRepository } from '../domain/repositories/auth.repository';

export interface LoginResponse {
  result: boolean;
  refreshToken: string;
  name: string;
}

export class LoginApplication {
  constructor(private repository: AuthRepository) {}

  async handle(
    email: string,
    password: string
  ): Promise<LoginResponse | ErrorBase> {
    const result = await this.repository.searchUserByEmail(email);

    if (result.isErr()) {
      return result.error;
    }

    const passwordHash = result.value.data.password;

    return {
      result: await bcrypt.compare(password, passwordHash),
      refreshToken: result.value.data.refreshToken,
      name: result.value.data.name,
    };

    //return UserResponseDto.fromDomainToResponseWithPassword(result.value);
  }
}
