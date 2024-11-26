import { Users } from "../entity/users.entity";
import { Role } from "../enum/role.enum";
import { Appointments } from "../entity/appointments.entity";
declare function checkUserExists(userId: string, role: Role): Promise<Users>;
declare function checkNotPastDate(fieldName: string, date: string): Promise<void>;
declare function checkAppointmentExists(id: number): Promise<Appointments>;
declare function checkAppointCreated(doctorId: string, patientId: string): Promise<Appointments>;
declare function checkEmailExists(email: string): Promise<void>;
export { checkUserExists, checkNotPastDate, checkAppointmentExists, checkAppointCreated, checkEmailExists };
