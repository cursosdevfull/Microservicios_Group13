export class ErrorBase extends Error {
  status?: number;
}

export enum ERROR_MESSAGES {
  AUTH_LOGIN = "AuthLoginException",
}
