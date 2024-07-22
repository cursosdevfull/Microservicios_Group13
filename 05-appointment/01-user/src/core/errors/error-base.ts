export class ErrorBase extends Error {
  status?: number;
}

export enum ERROR_MESSAGES {
  USER_INSERT = "UserInsertException",
  USER_GET_BY_EMAIL = "UserGetByEmailException",
  USER_NOT_FOUND = "UserNotFoundException",
}
