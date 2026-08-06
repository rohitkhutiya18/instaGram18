import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ForgetPasswordEntity } from './entities/forget-password.entity';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/common/password/password.service';

@Injectable()
export class ForgetPasswordService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    @InjectRepository(ForgetPasswordEntity)
    private forgetPasswordEntity: Repository<ForgetPasswordEntity>,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async ForgetPasswordEmailVerify(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const findEmailIsExist = await this.forgetPasswordEntity.findOne({
      where: { email: email },
    });

    if (findEmailIsExist) {
      await this.forgetPasswordEntity.delete(findEmailIsExist);
    }

    const otp = randomInt(1000, 10000);

    const html = `
     <p>forget password OTP</p>
     <p>${otp}</p>
    `;
    const subject = 'verify email for forget password';
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);
    try {
      const sendMail = await this.mailService.sendMail(email, html, subject);

      const createOTP = this.forgetPasswordEntity.create({
        email,
        otp: `${otp}`,
        expiresAt,
      });

      await this.forgetPasswordEntity.save(createOTP);

      return { message: 'otp sent successfully' };
    } catch (error) {
      throw new InternalServerErrorException('internal server error');
    }
  }

  async ForgetPasswordVerifyOTP(email: string, otp: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('user not found with this email');
    }

    const findOTPRelationUser = await this.forgetPasswordEntity.findOne({
      where: { email },
    });

    if (!findOTPRelationUser) {
      throw new NotFoundException('otp not found for this email');
    }

    if (findOTPRelationUser.expiresAt.getTime() < Date.now()) {
      await this.forgetPasswordEntity.remove(findOTPRelationUser);
      throw new UnauthorizedException('otp expired');
    }

    if (otp !== findOTPRelationUser.otp) {
      throw new BadRequestException('wrong otp');
    }
    const payload = {
      otp,
      email,
    };
    const resetToken = await this.jwtService.signAsync(payload, {
      secret: `${process.env.resetTokenSecret}`,
    });

    findOTPRelationUser.resetToken = resetToken;
    await this.forgetPasswordEntity.save(findOTPRelationUser);

    if (!resetToken) {
      throw new InternalServerErrorException('internal server error');
    }
    return { resetToken, status: 200, message: 'otp verify success' };
  }

  async resetPassword(email: string, token: string, password: string) {
    const findRelation = await this.forgetPasswordEntity.findOne({
      where: { email },
    });

    if (!findRelation) {
      throw new NotFoundException('not found');
    }

    if (findRelation.resetToken !== token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const hash = await this.passwordService.hashPassword(password);
    user.password = hash;

    await this.userService.saveUser(user);

    await this.forgetPasswordEntity.remove(findRelation);

    return { status: 200, message: 'password changed successfully' };
  }
}
