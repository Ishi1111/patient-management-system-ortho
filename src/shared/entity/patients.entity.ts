import { BaseEntity, Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Index("patients_user_id", ["userId"], {})
@Entity('patients')
export class Patients extends BaseEntity {

   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ name: 'user_id', nullable: false })
   userId: string;

   @Column({ name: 'dob', nullable: false })
   dob: Date;

   @Column({ name: 'contact_number', length: 15, nullable: false })
   contactNumber: string;

   @Column('text', { name: 'address', nullable: false })
   address: string;

   @Column('text', { name: 'medical_history', nullable: true })
   medicalHistory: string;

   @OneToOne(() => Users)
   @JoinColumn({ name: "user_id", referencedColumnName: "id" })
   user: Users;

}
