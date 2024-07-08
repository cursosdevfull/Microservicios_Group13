import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";
import {
  InsertUserResponse,
  InsertUserResponseDto,
} from "./dtos/insert-user.response";

export class InsertUserApplication {
  constructor(private repository: UserRepository) {}

  async handle(user: User): Promise<InsertUserResponse | null> {
    const result = await this.repository.insert(user);

    if (result instanceof Error) {
      return null;
    }

    return InsertUserResponseDto.fromDomainToResponse(result);
  }
}
