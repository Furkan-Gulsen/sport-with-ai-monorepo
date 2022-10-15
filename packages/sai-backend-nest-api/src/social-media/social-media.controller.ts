import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RtGuard } from '../guards';
import { SocialMediaService } from './social-media.service';
import { Pool, PostComment, PostI } from '../models';
import { FileInterceptor } from '@nestjs/platform-express';
import RoleGuard from '../guards/role.guard';

@Controller('social-media')
export class SocialMediaController {
  constructor(private socialMediaService: SocialMediaService) {}

  @Get('post/all')
  @UseGuards(RtGuard)
  getAllPost(@Req() request): Promise<PostI[] | HttpException> {
    return this.socialMediaService.getAllPosts(request.user.sub);
  }

  @Get('post/:postId')
  @UseGuards(RtGuard)
  getPost(@Param('postId') postId: string): Promise<PostI | HttpException> {
    if (!postId) {
      throw new HttpException(
        'There is a problem. Please try again later what you want to do..',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
    return this.socialMediaService.getPost(postId);
  }

  @Get('admin/post/user/:userId')
  @UseGuards(RtGuard, RoleGuard('admin'))
  getPostFromUserForAdmin(
    @Param('userId') userId: string,
  ): Promise<PostI[] | HttpException> {
    if (!userId) {
      throw new HttpException(
        'There is a problem. Please try again later what you want to do..',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
    return this.socialMediaService.getPostFromUser(userId);
  }

  @Get('post/user')
  @UseGuards(RtGuard)
  getPostFromUser(@Req() request): Promise<PostI[] | HttpException> {
    return this.socialMediaService.getPostFromUser(request.user.sub);
  }

  @Delete('del/:postId')
  @UseGuards(RtGuard, RoleGuard('admin'))
  deletePost(@Req() request, @Param('postId') postId: string): void {
    this.socialMediaService.deletePost(postId, request.user.sub);
  }

  @Post('share/text')
  @UseGuards(RtGuard)
  shareText(@Body() postI: PostI): Promise<PostI | HttpException> {
    return this.socialMediaService.createPostText(postI);
  }

  @Post('share/image')
  @UseGuards(RtGuard)
  shareImage(
    @Req() request,
    @Body() body: any,
  ): Promise<PostI | HttpException> {
    return this.socialMediaService.createPostImage({
      userId: request.user.sub,
      content: body.content,
      imageURL: body.imageURL,
    });
  }

  @Post('upload/image')
  @UseGuards(RtGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile('file') file) {
    return this.socialMediaService.uploadImage(file);
  }

  @Post('share/pool')
  @UseGuards(RtGuard)
  sharePool(@Body() postI: PostI): Promise<PostI | HttpException> {
    return this.socialMediaService.createPostPool(postI);
  }

  @Post('share/comment')
  @UseGuards(RtGuard)
  shareComment(
    @Body() postComment: PostComment,
    @Req() request,
  ): Promise<PostComment | HttpException> {
    postComment.commentUserId = request.user.sub;
    return this.socialMediaService.createComment(postComment);
  }

  @Get('comments/:postId')
  @UseGuards(RtGuard)
  getPostComments(
    @Param('postId') postId: string,
  ): Promise<PostComment[] | HttpException> {
    if (!postId) {
      throw new HttpException(
        'There is a problem. Please try again later what you want to do..',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
    return this.socialMediaService.getPostComments(postId);
  }

  @Delete('comments/:commentId')
  @UseGuards(RtGuard)
  deletePostComments(@Param('commentId') commentId: string): void {
    if (!commentId) {
      throw new HttpException(
        'There is a problem. Please try again later what you want to do..',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
    this.socialMediaService.deleteComment(commentId);
  }

  @Get('comment/like')
  @UseGuards(RtGuard)
  likeForPostComment(
    @Query('postCommentId') postCommentId: string,
    @Req() request,
  ): void {
    if (!postCommentId) {
      throw new HttpException(
        'There is a problem. Please try again later what you want to do..',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
    this.socialMediaService.likeForPostComment(postCommentId, request.user.sub);
  }

  @Patch('post/like')
  @UseGuards(RtGuard)
  likeForPost(@Req() request, @Query('postId') postId: string): void {
    if (!postId) {
      throw new HttpException(
        'There is a problem. Please try again later what you want to do..',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
    this.socialMediaService.likeForPost(postId, request.user.sub);
  }

  @Post('pool/answer')
  @UseGuards(RtGuard)
  answerPool(
    @Req() request,
    @Query('poolId') poolId: string,
    @Query('answer') answer: number,
  ): Promise<Pool | HttpException> {
    return this.socialMediaService.answerPool(poolId, answer, request.user.sub);
  }
}
