import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mailEntity } from './enitities/mail.entity';
import { RegisteredUserEntity } from 'src/user/entities/RegisteredUser.entity';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports:[TypeOrmModule.forFeature([mailEntity,RegisteredUserEntity]),RedisModule],
  providers: [MailService],
  exports:[MailService]
})
export class MailModule {}
