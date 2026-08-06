import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtGaurd } from 'src/auth/auth.gaurd';
import { type Request } from 'express';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}
     
  @Post('follow-user')
  @UseGuards(JwtGaurd)
  followUser(@Req() req:Request,@Body() body:{id:string}){
    const follower = req.user as any
    return this.followService.followUser(follower.id,body.id)
  }

  @Post('unfollow-user')
  @UseGuards(JwtGaurd)
  unFollowUser(@Req() req:Request,@Body() body:{id:string}){
    const follower = req.user as any
    return this.followService.unFollowUser(follower.id,body.id)
  }

  @Get('/get-friends-list')
  @UseGuards(JwtGaurd)
  getFriendsList(@Req() req : Request){
    const user = req.user as any
    return this.followService.followingListOfUser(user.id);
  }
  
}
