import { UserEntity } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatEntity } from './chat.entity';

@Entity()
export class ConversationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user1' })
  user1!: UserEntity;


  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user2' })
  user2!: UserEntity;

  @OneToMany(()=>ChatEntity,chat=>chat.conversation)
  chats!:ChatEntity[];

  @CreateDateColumn()
  createdAt!:Date

  @Column({nullable:true})
  lastMessage!:string;

  @Column({type:'timestamp',nullable:true})
  lastMessageTime!:Date;
}
