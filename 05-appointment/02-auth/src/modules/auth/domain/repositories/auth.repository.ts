import { AuthLoginResult } from "../../infrastructure/auth.infrastructure";
import { Auth } from "../auth";

export interface AuthRepository {
  login(Auth: Auth): Promise<AuthLoginResult>;
}
