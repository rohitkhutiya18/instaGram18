import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { PasswordModule } from './common/password/password.module';
import { MailModule } from './mail/mail.module';
import { PostModule } from './post/post.module';
import { CloudnaryModule } from './cloudnary/cloudnary.module';
import { FollowModule } from './follow/follow.module';
import { ChatModule } from './chat/chat.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { SearchModule } from './search/search.module';
import { SaveModule } from './save/save.module';
import { NotificationModule } from './notification/notification.module';
import { ForgetPasswordModule } from './forget-password/forget-password.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DATABASE,
      username: process.env.DB_USERNAME,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      host: process.env.DB_HOST ? process.env.DB_HOST : 'postgres',
      password: process.env.DB_PASSWORD,
      entities: [UserEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PasswordModule,
    MailModule,
    PostModule,
    CloudnaryModule,
    FollowModule,
    ChatModule,
    CommentModule,
    LikeModule,
    SearchModule,
    SaveModule,
    NotificationModule,
    ForgetPasswordModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
