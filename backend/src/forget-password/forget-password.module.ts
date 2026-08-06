import { Module } from '@nestjs/common';
import { ForgetPasswordService } from './forget-password.service';
import { ForgetPasswordController } from './forget-password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForgetPasswordEntity } from './entities/forget-password.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { PasswordModule } from 'src/common/password/password.module';

@Module({
  imports:[TypeOrmModule.forFeature([ForgetPasswordEntity,UserEntity]),
  JwtModule.register({
    secret:`${process.env.resetTokenSecret}`,
    signOptions:{
      expiresIn:2*60*100
    }
  })
  ,UserModule,MailModule,PasswordModule],
  controllers: [ForgetPasswordController],
  providers: [ForgetPasswordService],
})
export class ForgetPasswordModule {}
