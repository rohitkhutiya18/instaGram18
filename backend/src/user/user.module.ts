import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CloudnaryModule } from 'src/cloudnary/cloudnary.module';
import { RegisteredUserEntity } from './entities/RegisteredUser.entity';
import { FollowEntity } from 'src/follow/entities/follow.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,RegisteredUserEntity,FollowEntity,PostEntity]),
  CloudnaryModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
