import {
  UserGetByEmailResult,
  UserSaveResult,
} from "../../infrastructure/user.infrastructure";
import { User } from "../user";

export interface UserRepository {
  save(user: User): Promise<UserSaveResult>;
  getUserByEmail(email: string): Promise<UserGetByEmailResult>;
  getUserById(id: string): Promise<User | null>;
}
