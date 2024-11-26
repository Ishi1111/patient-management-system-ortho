import { Role } from "../enum/role.enum";
export interface JwtPayload {
    id: string;
    role: Role;
    firstName: string;
    lastName: string;
    email: string | null;
    date: string;
    exp?: number;
}
