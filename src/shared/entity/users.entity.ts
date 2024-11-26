import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enum/role.enum";
import { Gender } from "../enum/gender.enum";
import { Patients } from "./patients.entity";
import { Doctors } from "./doctors.entity";
import * as bcrypt from "bcrypt";
import { Appointments } from "./appointments.entity";
import { Exclude } from "class-transformer";

@Entity('users')
export class Users extends BaseEntity {

   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column("varchar", { name: "first_name", length: 30, nullable: true })
   firstName: string;

   @Column("varchar", { name: "last_name", length: 30, nullable: true })
   lastName: string;

   @Column("varchar", { name: "email", length: 100, nullable: true })
   email: string;

   @Column("varchar", { name: "password", length: 255, nullable: false })
   @Exclude()
   password: string;

   @Column("varchar", { name: "salt", length: 50, nullable: false })
   @Exclude()
   salt: string;

   @Column('enum', { name: "role", enum: Role, nullable: false, comment: "admin,doctor,patient" })
   role: Role;

   @Column('enum', { name: "gender", enum: Gender, nullable: false, comment: "male,female,other" })
   gender: Gender;

   @Column('boolean', { name: 'is_active', default: true, comment: "true=active, false=inactive" })
   isActive: boolean;

   @CreateDateColumn({
      type: "timestamp with time zone",
      name: "created_at"
   })
   createdAt: Date;

   @UpdateDateColumn({
      type: "timestamp with time zone",
      name: "updated_at"
   })
   updatedAt: Date;

   @ManyToOne(() => Users, (p) => p.userUpdatedBy)
   @JoinColumn([{ name: "updated_by", referencedColumnName: "id" }])
   updatedByUser: Users;

   @OneToMany(() => Users, (u) => u.updatedByUser)
   userUpdatedBy: Users[];

   @OneToMany(() => Patients, (u) => u.user)
   patient: Patients[];

   @OneToMany(() => Doctors, (u) => u.user)
   doctor: Doctors[];

   @OneToMany(() => Appointments, (u) => u.createdByUser)
   appointmentCreatedBy: Appointments[];

   @OneToMany(() => Appointments, (u) => u.updatedByUser)
   appointmentUpdatedBy: Appointments[];


   @OneToMany(() => Appointments, (appointment) => appointment.patients)
   appointmentPatient: Appointments[];

   @OneToMany(() => Appointments, (appointment) => appointment.doctors)
   appointmentDoctor: Appointments[];

   @BeforeInsert()
   async hashPassword() {
      if (this.password) {
         this.password = await bcrypt.hash(this.password, this.salt);
      }
   }

   async validatePassword(password: string): Promise<boolean> {
      const isValid = await bcrypt.compare(password, this.password);

      return isValid;
   }

}
