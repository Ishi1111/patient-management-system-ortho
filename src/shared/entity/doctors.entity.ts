import { BaseEntity, Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Index("doctors_user_id", ["userId"], {})
@Entity('doctors')
export class Doctors extends BaseEntity {

   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column('uuid', { name: 'user_id', nullable: false })
   userId: string;

   @Column('varchar', { name: 'phone_number', length: 15, nullable: false })
   phoneNumber: string;

   @Column('date', { name: 'dob', nullable: false })
   dob: Date;

   @Column('varchar', { name: 'degree', length: 150, nullable: false })
   degree: string;

   @Column('varchar', { name: 'speciality', length: 100, nullable: false })
   speciality: string;

   @Column('text', { name: 'address', nullable: true })
   address: string | null;

   @OneToOne(() => Users)
   @JoinColumn({ name: "user_id", referencedColumnName: "id" })
   user: Users;


}
