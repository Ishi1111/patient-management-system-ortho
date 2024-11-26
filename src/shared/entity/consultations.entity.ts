import { BaseEntity, Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointments } from "./appointments.entity";

@Index("consultations_appointment_id", ["appointmentId"], {})
@Entity('consultations')
export class Consultations extends BaseEntity {

   @PrimaryGeneratedColumn()
   id: number;

   @Column({ name: 'appointment_id', nullable: false })
   appointmentId: number;

   @Column('text', { name: 'diagnosis', nullable: false })
   diagnosis: string;

   @Column('text', { name: 'treatment', nullable: true })
   treatment: string;

   @OneToOne(() => Appointments)
   @JoinColumn([{ name: 'appointment_id', referencedColumnName: "id" }])
   appointment: Appointments;
}
