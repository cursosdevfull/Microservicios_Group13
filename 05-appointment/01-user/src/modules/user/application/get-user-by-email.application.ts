import { ErrorBase } from "../../../core/errors/error-base";
import { UserRepository } from "../domain/repositories/user.repository";
import {
  UserResponseDto,
  UserResponseWithPassword,
} from "./dtos/user-response.dto";

export class GetUserByEmailApplication {
  constructor(private repository: UserRepository) {}

  async handle(email: string): Promise<UserResponseWithPassword | ErrorBase> {
    const result = await this.repository.getUserByEmail(email);

    if (result.isErr()) {
      return result.error;
    }

    return UserResponseDto.fromDomainToResponseWithPassword(result.value);
  }
}
