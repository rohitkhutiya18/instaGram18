import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { JwtGaurd } from 'src/auth/auth.gaurd';
import {type Request } from 'express';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService
  ) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('profileImage',{
    storage:diskStorage({
        destination:'./uploads',
        filename(req, file, callback) {
          const unique = `${randomUUID()}-${extname(file.originalname)}`
          callback(null,unique)
        },
    })
  }))
  create(@Body() body: CreateUserDto,@UploadedFile() profileImage : Express.Multer.File ) {
  
    return this.userService.createUser(body,profileImage.path);
  }

  @Get('all')
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get()
  @UseGuards(JwtGaurd)
  findOne(@Req() req: Request) {
    const user = req.user as any
    return this.userService.findById(user.id);
  }

  @Get('profile')
  @UseGuards(JwtGaurd)
  findUserProfile(@Req() req:Request){
    const user = req.user as any
    return this.userService.userProfile(user.id);
  }

  @Patch('update-user-profile')
  @UseGuards(JwtGaurd)
  update(@Req() req:Request , @Body() updateUserDto: Partial<CreateUserDto>) {
    const user = req.user as any
console.log(updateUserDto)
    return this.userService.update(user.id, updateUserDto);
  }


  @Patch('update-profile-pic')
  @UseGuards(JwtGaurd)
  @UseInterceptors(
    FileInterceptor('newProfilePic',{
      storage:diskStorage({
        destination:'./uploads',
        filename(req, file, callback) {
          const unique = `${randomUUID()}-${extname(file.originalname)}`
          callback(null,unique)
        },
      })
    })
  )
  updateProfilePic(@Body() body:{public_id:string} ,@UploadedFile() file : Express.Multer.File,@Req() req : Request){
    const user = req.user as any    
   console.log('profile pic uspte',body)
   const public_id = body.public_id || null
   console.log(file)
    return this.userService.updatePic(file.path,public_id,user.id);
  }

  @Delete('delete-profile-pic')
  deleteProfilePic(@Body() body :{id:string},@Req() req :Request){
      const user = req.user as any
    return this.userService.deletePic(body.id,user.id);
  }



  @Get('/creater-profile')
  getCreaterProfile(@Query('userId') userId:string){
    return this.userService.getCreaterProfile(userId);
  }

}
