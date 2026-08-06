import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowEntity } from './entities/follow.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([FollowEntity,UserModule])],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
