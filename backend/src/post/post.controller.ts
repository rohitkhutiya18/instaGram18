import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req, UploadedFiles, Query, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { type Request } from 'express';
import { JwtGaurd } from 'src/auth/auth.gaurd';
import { CreatePostDto } from './dto/create-post.dto';
import { optionalGaurd } from './gaurds/optionJwt.gaurd';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService
  ) {}
   
  // create post 
  @UseGuards(JwtGaurd)
  @Post('create')
  @UseInterceptors(
    FilesInterceptor('postImages',3,{
      storage:diskStorage({
        destination:'./uploads',
        filename:(req,file,cb)=>{
          const unquie = `${randomUUID()}-${extname(file.originalname)}`;
          cb(null,unquie);
        }
      })
    })
  ) 
  create(@Req() req:Request, 
    @Body() body : CreatePostDto,
         @UploadedFiles() files: Express.Multer.File[]) {
                    const urlArr = files?.map((val)=>val.path)
          const user = req.user as any
    return this.postService.create(user.id,body,urlArr);
  }



  // get post
  @UseGuards(JwtGaurd)
  @Get('user-all-post-of-user')
  findAllPostOfuser(@Req() req: Request) {
    const user = req.user as any
    return this.postService.findAllPostOfUser(user.id);
  }

  //post on feed 
  @Get('scroll')
  @UseGuards(JwtGaurd)
  homePagePost(@Req() req:Request){
    const user = req.user as any
    const ans = this.postService.feedPosts(user)
    return ans
  }

  //post on feed without login 
  @Get('/without-login')
  homePagePostWithoutLogin(){
    return this.postService.feedPostWithOutLogin()
  }


  // delete post
  @UseGuards(JwtGaurd)
  @Delete('delete-post')
  deletePost(@Body() body:{id:string},@Req() req : Request){
           const user = req.user as any
        
           return this.postService.removePost(body.id,user.id);
  }

  // delete post Image
    @Delete('remove-post-img')
  @UseGuards(JwtGaurd)
  removePostImage(@Body() body:{imageId:string,postId:string}) {
    return this.postService.removePostImage(body.imageId,body.postId);
  }

  @Patch('update-post')
  @UseGuards(JwtGaurd)
  @UseInterceptors(
    FilesInterceptor('updatePostImage',3,{
      storage:diskStorage({
        destination:'./uploads',
        filename:(req,file,cb)=>{
          const unquie = `${randomUUID()}${extname(file.originalname)}`;
          cb(null,unquie);
        }
      })
    })
  )
  updatePost(@Body() body:UpdatePostDto,@Req() req:Request,@UploadedFiles() file:Express.Multer.File[]){

     const user = req.user as any    
     const ImageUrlArr = (file ?? []).map(f => f.path);
    
    return this.postService.updatePost(body,user.id,ImageUrlArr);
  }
  
}
