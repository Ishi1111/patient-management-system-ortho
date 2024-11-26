import {
   BaseEntity,
   BeforeInsert,
   Column,
   CreateDateColumn,
   Entity,
   JoinColumn,
   ManyToOne,
   PrimaryGeneratedColumn
} from "typeorm";
import { Users } from "./users.entity";

@Entity({ name: "token" })
export class Token extends BaseEntity {

   @PrimaryGeneratedColumn()
   id: number;

   @Column("uuid", { name: "user_id" })
   userId: string;

   @Column("text", { name: "access_token", unique: true })
   accessToken: string;

   @ManyToOne(() => Users, (user) => user.id)
   @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
   user: Users;

   @CreateDateColumn({
      type: "timestamp with time zone",
      name: "created_at"
   })
   createdAt: Date;

   @BeforeInsert()
   setUserId() {
      if (this.user) {
         this.userId = this.user.id;
      }
   }
}
