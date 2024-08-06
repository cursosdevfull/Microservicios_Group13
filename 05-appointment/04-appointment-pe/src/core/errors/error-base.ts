export class ErrorBase extends Error {
  status?: number;
}

export enum ERROR_MESSAGES {
  APPOINMENT_INSERT = "AppointmentInsertException",
}
