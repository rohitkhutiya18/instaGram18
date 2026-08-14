import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';;
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { FollowEntity } from 'src/follow/entities/follow.entity';
import { ConversationEntity } from './entities/conversation.entity';
@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity) private chatEntity: Repository<ChatEntity>,
    @InjectRepository(ConversationEntity) private converationEntity:Repository<ConversationEntity>,
    @InjectRepository(FollowEntity)
    private readonly followEntity: Repository<FollowEntity>,
  ) {}

  async createMessage(
    createChatDto: CreateChatDto,
    senderId: string,
    recevierId: string,
  ) {

    let conversation = await this.converationEntity
    .createQueryBuilder('conversation')
    .leftJoin('conversation.user1','user1')
    .leftJoin('conversation.user2','user2')
    .where(
      `(user1.id=:senderId AND user2.id=:recevierId)
       OR
       (user1.id=:recevierId AND user2.id=:senderId)`,
      {senderId,recevierId}
    )
    .getOne()

    if(!conversation){
     conversation =  this.converationEntity.create({
      user1: { id: senderId },
      user2: { id: recevierId },
    });

    await this.converationEntity.save(conversation);
  }
 
  const createChat = this.chatEntity.create({
    sender:{id:senderId},
    message:createChatDto.message,
    conversation:{id:conversation.id}
  })

    await this.chatEntity.save(createChat)

    conversation.lastMessage = createChatDto.message;
    conversation.lastMessageTime = new Date();

    await this.converationEntity.save(conversation);

    return createChat
  }

  async getConversation(id:string){
    const conversationList = await this.converationEntity
    .createQueryBuilder('conversation')
    .leftJoinAndSelect('conversation.user1','user1')
    .leftJoinAndSelect("conversation.user2",'user2')
    .leftJoinAndSelect('conversation.chats','chats')
    .leftJoinAndSelect('chats.sender','sender')
    .where(`user1.id=:id OR user2.id=:id`,{id})
    .orderBy('conversation.lastMessageTime','ASC')
    .getMany()

    return conversationList.map((val)=>{
    return   { id:val.id,
        lastMessage:val.lastMessageTime,
        user:val.user1.id !== id ? val.user1 : val.user2,
        chat:val.chats}
    })
  }

  async getChatHistory(user1:string,user2:string){
    const chatHistroy = await this.converationEntity
    .createQueryBuilder('conversaction')
    .leftJoinAndSelect("conversaction.user1",'user1')
    .leftJoinAndSelect('conversaction.user2','user2')
    .where(`(user1.id=:user1 AND user2.id=:user2 )
      OR
      (user1.id=:user2 AND user2.id=:user1)`,{user1,user2})
    .getMany()

   console.log(chatHistroy)
  }
}
