export class UserModel {
  userId!: string;
  name!: string;
  email!: string;
  age!: number;
  gender!: string;
  password!: string;
  createdAt!: Date;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;
}
