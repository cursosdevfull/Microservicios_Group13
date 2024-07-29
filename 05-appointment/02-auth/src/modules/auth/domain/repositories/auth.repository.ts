import { AuthSearchUserByEmail } from '../../infrastructure/auth.infrastructure';

export interface AuthRepository {
  searchUserByEmail(email: string): Promise<AuthSearchUserByEmail>;
}
