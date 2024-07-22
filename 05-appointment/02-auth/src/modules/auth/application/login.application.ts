import { ErrorBase } from "../../../core/errors/error-base";
import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/repositories/auth.repository";

export class LoginApplication {
  constructor(private repository: AuthRepository) {}

  async handle(
    email: string,
    password: string
  ): Promise<UserResponseWithPassword | ErrorBase> {
    const result = await this.repository.login(
      new Auth({ email, password: "abdc" })
    );

    if (result.isErr()) {
      return result.error;
    }

    return UserResponseDto.fromDomainToResponseWithPassword(result.value);
  }
}
