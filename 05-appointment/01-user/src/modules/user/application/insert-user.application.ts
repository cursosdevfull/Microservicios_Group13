import { ErrorBase } from "../../../core/errors/error-base";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";
import { UserResponse, UserResponseDto } from "./dtos/user-response.dto";

export class InsertUserApplication {
  constructor(private repository: UserRepository) {}

  async handle(user: User): Promise<UserResponse | ErrorBase> {
    const result = await this.repository.save(user);

    if (result.isErr()) {
      return result.error;
    }

    return UserResponseDto.fromDomainToResponse(result.value);
  }
}
