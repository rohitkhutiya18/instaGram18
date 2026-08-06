import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { promises as fs } from 'fs';
import { CloudnaryService } from 'src/cloudnary/cloudnary.service';
import { RegisteredUserEntity } from './entities/RegisteredUser.entity';
import { FollowEntity } from 'src/follow/entities/follow.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { LikeEntity } from 'src/like/entities/like.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    @InjectRepository(RegisteredUserEntity)
    private registeredUserEntity: Repository<RegisteredUserEntity>,
    @InjectRepository(PostEntity) private postEntity: Repository<PostEntity>,
    private readonly cloudnaryService: CloudnaryService,
  ) {}

  async createUser(createUserDto: CreateUserDto,profileImage:string) {

    const findEmail = await this.registeredUserEntity.findOne({
      where: { email: createUserDto.email },
    });


    if (!findEmail) {
      throw new NotAcceptableException('your email is not verified');
    }

    const findUser = await this.userEntity.findOne({
      where: { email: createUserDto.email },
    });

    if (findUser) {
      throw new NotAcceptableException('you already have registered account');
    }

    const createUser = this.userEntity.create(createUserDto);
    
    const cloudnaryData = await this.cloudnaryService.uploadImageInCloud(profileImage);
  
    if(cloudnaryData){
      createUser.profilePic = {
        url:cloudnaryData.secure_url,
        publicId:cloudnaryData.public_id
      }
    }

    try {
      await fs.unlink(profileImage)
    } catch{}


    return this.userEntity.save(createUser);
  }

  async findAllUsers() {
    return this.userEntity.find();
  }

  async userProfile(id:string){
       const userProfileData = await this.userEntity
       .createQueryBuilder('user')
       .select([
        '*'
       ])
       .addSelect(subQuery=>{
        return subQuery
        .select('COUNT(*)')
        .from(PostEntity,'post')
        .where('post.userId=:userId',{userId:id})},
        'postCount')
       .addSelect(subQuery=>{
        return subQuery
        .select('COUNT(*)')
        .from(FollowEntity,'follow')
        .where('follow.followerId=:userId',{userId:id})},
        'followingCount')
        .addSelect(subQuery=>{
        return subQuery
        .select('COUNT(*)')
        .from(FollowEntity,'follow')
        .where('follow.followingId=:userId',{userId:id})},
        'followerCount')
        .where('user.id=:userId',{userId:id})
        .getRawOne()

        const userAllPosts = await this.postEntity
        .createQueryBuilder('post')
        .select(['*'])
        .addSelect(subQuery=>{
          return subQuery.select('COUNT(*)').from(LikeEntity,'like').where('like.postId=post.id')
        },'likes')
        .addSelect(subQuery=>{
          return subQuery.select('COUNT(*)').from(CommentEntity,'comment').where('comment.postId=post.id')
        },'comments')
        .where('post.userId=:userId',{userId:id})
        .getRawMany()

       
       const res = {
        ...userProfileData,
        userPostData:userAllPosts
       }
        return res
  }

  async findById(id: string) {
   return this.userEntity.findOne({where:{id}})
   
  }

  async findByEmail(email: string) {
    const user = await this.userEntity.findOne({ where: { email: email } });

    if (!user) {
      throw new NotFoundException('user Not Found with this email');
    }

    return user;
  }

  async saveUser(UserData: CreateUserDto) {
    return await this.userEntity.save(UserData);
  }

  async update(id: string, updateUserDto: Partial<CreateUserDto>) {
    const user = await this.userEntity.findOne({ where: { id } });
  console.log(updateUserDto)
    if (!user) {
      throw new NotFoundException('user Not Found');
    }

    Object.assign(user, updateUserDto);
    return this.userEntity.save(user);
  }

  async uploadFile(imgUrl: string, email: string) {
    const user = await this.findByEmail(email);
     console.log(user)
    if(!user){
      throw new NotFoundException("user not found to uploadfile")
    }
   
    const cloudImgUrl = await this.cloudnaryService.uploadImageInCloud(imgUrl);
    

    if(cloudImgUrl){
    user.profilePic = {
      url:cloudImgUrl.secure_url,
    publicId:cloudImgUrl.public_id} ;
  }

  console.log(user)
    if(cloudImgUrl.secure_url){
     try {
       await fs.unlink(imgUrl)
     } catch {}
    }

    return this.userEntity.save(user);
  }

  async updatePic(url:string,public_id:string | null, id: string) {
    const user = await this.userEntity.findOne({where:{id:id}});

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if(public_id !== null){
    const deleteImage = await this.cloudnaryService.deleteImageInCloud(public_id);
      user.profilePic = {
          url:'',
          publicId:''
        }
}
  
      try {
        const addInCloudnary = await this.cloudnaryService.uploadImageInCloud(url);
        user.profilePic = {
          url:addInCloudnary.secure_url,
          publicId:addInCloudnary.public_id
        }
        await fs.unlink(url);
      } catch {}
    

    //  const deleteImg = await this.cloudnaryService.deleteImageInCloud(user?.profilePic);
    return this.userEntity.save(user);
  }

  async deletePic(public_id: string,userId:string) {
    const user  = await this.userEntity.findOne({where:{id:userId}});

    if(!user){
      throw new NotFoundException('user not found to delete image');
    }

    if(!user){throw new NotFoundException("user not found")}

    const res = await this.cloudnaryService.deleteImageInCloud(user.profilePic?.publicId || public_id);

    user.profilePic = {url:'',publicId:''}

    await this.userEntity.save(user);

    return { message: 'image deleation successfull' };
  }

  async getCreaterProfile(userId:string){
     const findCreater = await this.userProfile(userId);
     if(!findCreater){
      throw new NotFoundException("Something went wrong")
     }
     return findCreater;
  }
}
