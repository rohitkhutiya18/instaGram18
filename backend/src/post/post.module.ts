import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CloudnaryModule } from 'src/cloudnary/cloudnary.module';
import { LikeEntity } from 'src/like/entities/like.entity';
import { SaveEntity } from 'src/save/entities/save.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { FollowEntity } from 'src/follow/entities/follow.entity';
import { optionalJwtGaurd } from 'src/auth/strategy/optionalJwtGaurd';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([PostEntity,LikeEntity,SaveEntity,CommentEntity,UserEntity,FollowEntity]),
  CloudnaryModule,JwtModule.register({
    secret:`${process.env.accessTokenSecret}`
  })],
  controllers: [PostController],
  providers: [PostService,optionalJwtGaurd],
})
export class PostModule {}
