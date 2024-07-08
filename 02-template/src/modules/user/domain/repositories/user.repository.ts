import { InsertResult } from "../../infrastructure/user.infrastructure";
import { User } from "../user";

export interface UserRepository {
  insert(user: User): Promise<InsertResult>;
}
