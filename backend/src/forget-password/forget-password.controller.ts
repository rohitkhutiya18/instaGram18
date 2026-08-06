import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ForgetPasswordService } from './forget-password.service';
import { CreateForgetPasswordDto } from './dto/create-forget-password.dto';
import { UpdateForgetPasswordDto } from './dto/update-forget-password.dto';

@Controller('forget-password')
export class ForgetPasswordController {
  constructor(private readonly forgetPasswordService: ForgetPasswordService) {}

  @Get('/send-otp-forget-password')
  sendOTPForgetPassword(@Query('email') email:string){

       return this.forgetPasswordService.ForgetPasswordEmailVerify(email);
  }

  @Post('/verify-email-forget-password')
  verifyEmailForgetPassword(@Body() body:{email:string,otp:string}){
    return this.forgetPasswordService.ForgetPasswordVerifyOTP(body.email,body.otp);
  }

  @Post('/reset-password')
  resetPassword(@Body() body:{email:string,token:string,password:string}){
    console.log(body)
    return this.forgetPasswordService.resetPassword(body.email,body.token,body.password);
  }

 
}
