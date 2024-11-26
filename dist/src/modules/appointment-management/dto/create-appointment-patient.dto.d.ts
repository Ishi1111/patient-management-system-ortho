export declare class CreateAppointmentByPatientDto {
    doctorId: string;
    dateTime: string;
}
export declare class CreateAppointmentByAdminDto extends CreateAppointmentByPatientDto {
    patientId: string;
}
