export interface AppointmentPropertiesRequired {
  appointmentId: string;
  patientId: string;
  centerId: string;
  specialtyId: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentStatus: string;
  country: string;
}

export interface AppointmentPropertiesOptionals {
  createdAt: Date;
  updatedAt: Date;
}

export type AppointmentProperties = AppointmentPropertiesRequired &
  Partial<AppointmentPropertiesOptionals>;

export class Appointment {
  private readonly appointmentId: string;
  private patientId: string;
  private centerId: string;
  private specialtyId: string;
  private appointmentDate: string;
  private appointmentTime: string;
  private appointmentStatus: string;
  private country: string;
  private createdAt: Date;

  constructor(props: AppointmentProperties) {
    Object.assign(this, props);
    this.createdAt = new Date();
  }

  get properties() {
    return {
      appointmentId: this.appointmentId,
      patientId: this.patientId,
      centerId: this.centerId,
      specialtyId: this.specialtyId,
      appointmentDate: this.appointmentDate,
      appointmentTime: this.appointmentTime,
      appointmentStatus: this.appointmentStatus,
      country: this.country,
      createdAt: this.createdAt,
    };
  }
}
