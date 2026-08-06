import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ForgetPasswordEntity {
   @PrimaryGeneratedColumn("uuid")
   id!:string;

   @Column()
   otp!:string;

   @Column()
   email!:string;

   @CreateDateColumn()
   createdAt!:Date

   @Column({type:'timestamp'})
   expiresAt!:Date;

   @Column({nullable:true})
   resetToken?:string;
}
