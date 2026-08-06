import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CloudnaryService } from 'src/cloudnary/cloudnary.service';
import { promises as fs } from 'fs';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { LikeEntity } from 'src/like/entities/like.entity';
import { SaveEntity } from 'src/save/entities/save.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { FollowEntity } from 'src/follow/entities/follow.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private postEntity: Repository<PostEntity>,
    @InjectRepository(LikeEntity) private likeEntity: Repository<LikeEntity>,
    @InjectRepository(SaveEntity) private saveEntity: Repository<SaveEntity>,
    @InjectRepository(CommentEntity)
    private commentEntity: Repository<CommentEntity>,
    private readonly cloudnaryService: CloudnaryService,
  ) {}

  async create(userId: string, createPostDto: CreatePostDto, files: string[]) {
    const addInCloud = await Promise.all(
      files.map(async (val) => {
        try {
          const result = await this.cloudnaryService.uploadImageInCloud(val);
          return result;
        } finally {
          await fs.unlink(val).catch(() => {});
        }
      }),
    );

    const imgUrl = addInCloud.map((val) => {
      return { url: val.secure_url, publicId: val.public_id };
    });

    const newPost = this.postEntity.create({
      caption: createPostDto.caption,
      images: imgUrl,
      user: {
        id: userId,
      },
    });

    await this.postEntity.save(newPost);
    return newPost;
  }

  async updatePost(updatePostDto: UpdatePostDto, userId: string,imgArr:string[]) {
    console.log(updatePostDto);
    const post = await this.postEntity.findOne({
      where: { id: updatePostDto.postId },
      relations: { user: true },
    });

    if (!post) {
      throw new NotFoundException('Post Not Found');
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException('forbidden');
    }

    if (updatePostDto.caption !== undefined) {
      post.caption = updatePostDto.caption;
    }

    if(imgArr.length > 0){
      const addImagesInCloudnary = await Promise.all(imgArr.map(async(file)=>{
        const result = await this.cloudnaryService.uploadImageInCloud(file);
        await fs.unlink(file);
        return result
      }))

      const newAddImages = addImagesInCloudnary.map((val)=>{
        return {url:val.secure_url,
        publicId:val.public_id}
      })

      post.images = [...post.images,...newAddImages];

    }



    return this.postEntity.save(post);
  }

  findAll(page: number, limit: number) {
    return this.postEntity.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findAllPostOfUser(id: string) {
    // const findPost = await this.postEntity.find({where:{user:{id:id}},relations:{user:true}});

    // if(!findPost){
    //   throw new NotFoundException("no post found out")
    // }

    const findPost = await this.postEntity
      .createQueryBuilder('post')
      .leftJoin(UserEntity, 'user', 'user.id=:id', { id })
      .leftJoin(LikeEntity, 'like', 'like.postId=post.id')
      .leftJoin(CommentEntity, 'comment', 'comment.postId=post.id')
      .leftJoin(FollowEntity, 'followerData', 'followerData.follower=:id', {
        id,
      })
      .leftJoin(FollowEntity, 'followingData', 'followingData.following=:id', {
        id,
      })
      .where('post.userId=:id', { id })
      .select([
        'post.id',
        'post.images',
        'post.caption',
        'post.createdAt',
        'comment.comment',
      ])
      .addSelect('COUNT(DISTINCT like.id)', 'likeCount')
      .addSelect('COUNT(DISTINCT comment.id)', 'commentCount')
      .addSelect('COUNT(DISTINCT followerData.id)', 'following')
      .addSelect('COUNT(DISTINCT followingData.id)', 'follower')
      .groupBy('post.id')
      .addGroupBy('like.id')
      .addGroupBy('comment.id')
      .addGroupBy('post.images')
      .addGroupBy('user.id')
      .getRawMany();

    return findPost;
  }

  async removePost(postId: string, userId: string) {
    const post = await this.postEntity.findOne({
      where: { id: postId },
      relations: {
        user: true,
      },
    });

    if (!post) {
      throw new NotFoundException('post not found');
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException('you are not authorized to remove image');
    }

    await Promise.all(
      post.images.map(async (val) => {
        return this.cloudnaryService.deleteImageInCloud(val.publicId);
      }),
    );

    return this.postEntity.remove(post);
  }


  async removePostImage(publicId: string,postId:string) {
    
    const findPost = await this.postEntity.findOne({where:{id:postId}});
    if(!findPost){
        throw new NotFoundException("Post Not found");
    }

    const isPostDeleted = await this.cloudnaryService.deleteImageInCloud(publicId);

    if(!isPostDeleted){
      throw new InternalServerErrorException("something went wrong");
    }
     
    findPost.images = findPost.images.filter((val)=>{val.publicId !== publicId});

    return this.postEntity.save(findPost)
  }


  async feedPosts(user: { email: string; id: string } | null) {
    let userId = user?.id;

    if(!userId){
      userId = 'null';
    }
   const findPostData = await this.postEntity
  .createQueryBuilder('post')
  .leftJoin(LikeEntity, 'like', 'like.postId = post.id AND like.userId=:userId',{userId})
  .leftJoin(UserEntity, 'user', 'user.id = post.userId')
  .leftJoin(
    FollowEntity,
    'follow',
    `follow.followerId = :userId AND follow.followingId = post.userId`,
    { userId }
  )
  .select([
    'post.id',
    'post.caption',
    'post.images',
    'post.createdAt',
    'user.id',
    'user.userName',
    'user.email',
    'user.profilePic'
  ])
  .addSelect(subQuery => {
    return subQuery.select('COUNT(*)').from(LikeEntity,'likes').where('likes.postId=post.id')
  },'likes')
  .addSelect(subQuery=>
    {return subQuery.select('COUNT(*)').from(CommentEntity,'comment').where('comment.postId=post.Id')},'comments'
  )
  .addSelect('follow.id IS NOT NULL', 'isFollowing')
  .addSelect('like.id IS NOT NULL','isLiked')
  .setParameter('userId', userId)
  .groupBy('post.id')
  .addGroupBy('user.id')
  .addGroupBy('follow.id')
  .addGroupBy('like.id')
  .orderBy('post.createdAt', 'DESC')
  .getRawMany();


    return findPostData;
  }

 async feedPostWithOutLogin(){
  console.log("hello")
  const res =await this.postEntity.createQueryBuilder('post')
  .leftJoin(UserEntity,'user','user.id=post.user.id')
  .select([
    'post.id','post.caption','post.images','post.createdAt','user.email','user.userName'
  ])
  .addSelect(subQuery=>{
    return subQuery.select
    ('COUNT(*)').from(LikeEntity,'like').where('like.postId=post.Id')
  },'likes')
  .addSelect(subQuery=>
  {  return subQuery.select('COUNT(*)').from(CommentEntity,'comment').where('comment.postId=post.id')},'comments'
  )
  .groupBy('post.id')
  .addGroupBy('post.caption')
  .addGroupBy('post.images')
  .addGroupBy('user.email')
  .addGroupBy('user.userName')
  .getRawMany()

  return res;
}

}
