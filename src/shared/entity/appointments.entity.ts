import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AppointmentStatus } from '../enum/appointment-status.enum';
import { Users } from './users.entity';

@Index("appointments_patient_id", ["patientId"], {})
@Entity('appointments')
export class Appointments extends BaseEntity {

   @PrimaryGeneratedColumn()
   id: number;

   @Column('uuid', { name: 'patient_id', nullable: false })
   patientId: string;

   @Column('uuid', { name: 'doctor_id', nullable: false })
   doctorId: string;

   @Column('enum', { name: "status", enum: AppointmentStatus, nullable: false, comment: "pending,confirmed,canceled,   completed" })
   status: AppointmentStatus;

   @Column({
      type: "timestamp with time zone",
      name: "date_time"
   })
   dateTime: Date;

   @Column("uuid", { name: "created_by", nullable: false })
   createdBy: string | null;

   @CreateDateColumn({
      type: "timestamp with time zone",
      name: "created_at"
   })
   createdAt: Date;

   @Column("uuid", { name: "updated_by", nullable: true })
   updatedBy: string | null;

   @UpdateDateColumn({
      type: "timestamp with time zone",
      name: "updated_at"
   })
   updatedAt: Date;

   @Column('boolean', { name: 'is_deleted', default: false, comment: "true=deleted, false=not-deleted" })
   isDeleted: boolean;


   @ManyToOne(() => Users, (user) => user.appointmentPatient)
   @JoinColumn([{ name: "patient_id", referencedColumnName: "id" }])
   patients: Users;

   @ManyToOne(() => Users, (user) => user.appointmentDoctor)
   @JoinColumn([{ name: "doctor_id", referencedColumnName: "id" }])
   doctors: Users;

   @ManyToOne(() => Users)
   @JoinColumn({ name: "created_by", referencedColumnName: "id" })
   createdByUser: Users;

   @ManyToOne(() => Users)
   @JoinColumn({ name: "updated_by", referencedColumnName: "id" })
   updatedByUser: Users;

}
