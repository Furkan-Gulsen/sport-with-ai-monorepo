/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileUploadService } from '../utils/file-upload.service';
import { PostI, PostComment, User, Pool } from '../models';
import { PrismaService } from '../prisma/prisma.service';
import { CustomLoggerService } from '../utils/logger.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line prettier/prettier
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sentiment = require('sentiment');

@Injectable()
export class SocialMediaService {
  constructor(
    private prisma: PrismaService,
    private fileUploadService: FileUploadService,
    private customLoggerService: CustomLoggerService,
  ) {}

  private checkSentimentAnalysis(text: string): HttpException | void {
    const sentiment = new Sentiment();
    const result = sentiment.analyze(text);
    if (result.score >= 0) {
      console.log('positive');
    } else {
      console.log('negative');
      throw new HttpException(
        "Your content is negative. Please don't use negative words.",
        HttpStatus.CONFLICT,
      );
    }
  }

  public async createPost(post: PostI): Promise<PostI | HttpException> {
    switch (post.postType) {
      case 'text':
        return await this.createPostText(post);
      case 'image':
        return this.createPostImage(post);
      case 'pool':
        return this.createPostPool(post);
      default:
        return new HttpException(
          'There is a problem. Please try again later.',
          HttpStatus.CONFLICT,
        );
    }
  }

  public async createPostText(post: PostI): Promise<PostI | HttpException> {
    this.checkSentimentAnalysis(post.content);
    try {
      this.customLoggerService.successLog(
        `A text post was shared. UserId: ${post.userId}`,
      );
      return await this.prisma.post.create({
        data: {
          content: post.content,
          postType: 'text',
          userId: post.userId,
        },
      });
    } catch (error) {
      console.log('error: ', error);
      this.customLoggerService.errorLog(
        `A text post was shared. error: ${error}`,
      );
      return new HttpException(
        'Your post could not be shared due to a problem. Please try again later.',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  public async createPostPool(post: PostI): Promise<PostI | HttpException> {
    try {
      this.checkSentimentAnalysis(post.content);
      this.customLoggerService.successLog(
        `A pool post was shared. UserId: ${post.userId}`,
      );
      return await this.prisma.post.create({
        data: {
          content: post.content,
          postType: 'pool',
          userId: post.userId,
          pool: {
            create: {
              options: post.pool.options,
              statistics: [0, 0, 0],
            },
          },
        },
        include: { pool: true },
      });
    } catch (error) {
      console.log('error: ', error);
      this.customLoggerService.errorLog(
        `A pool post was shared. error: ${error}`,
      );
      throw new HttpException(
        'Your post could not be shared due to a problem. Please try again later.',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  public async uploadImage(file: File) {
    try {
      const res: any = await this.fileUploadService.upload(file, 'postImages');
      return { location: res.Location };
    } catch (error) {
      console.error('error: ', error);
      throw new HttpException(
        'Your post could not be shared due to a problem. Please try again later.',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  public async createPostImage(body: any): Promise<PostI | HttpException> {
    try {
      this.checkSentimentAnalysis(body.content);
      this.customLoggerService.successLog(
        `A image post was shared. UserId: ${body.userId}`,
      );
      return await this.prisma.post.create({
        data: {
          content: body.content,
          postType: 'image',
          userId: body.userId,
          postImage: {
            create: {
              imageURL: body.imageURL,
            },
          },
        },
        include: { postImage: true },
      });
    } catch (error) {
      console.log('error: ', error);
      this.customLoggerService.errorLog(
        `A image post was shared. error: ${error}`,
      );
      return new HttpException(
        'Your post could not be shared due to a problem. Please try again later.',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  public async getPostFromUser(
    userId: string,
  ): Promise<PostI[] | HttpException> {
    try {
      return await this.prisma.post.findMany({
        where: { userId: userId },
        include: {
          postImage: true,
          postVideo: true,
          postComments: {
            include: { commentUser: true },
          },
          pool: true,
          user: true,
        },
      });
    } catch (error) {
      throw new Error('There is a problem. Please try again later.');
    }
  }

  public async getPost(postId: string): Promise<PostI | HttpException> {
    return await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        postImage: true,
        postVideo: true,
        postComments: {
          include: { commentUser: true },
        },
        pool: true,
        user: true,
      },
    });
  }

  public async createComment(
    postComment: PostComment,
  ): Promise<PostComment | HttpException> {
    try {
      this.checkSentimentAnalysis(postComment.comment);
      this.customLoggerService.successLog(
        `A user left a comment. UserId: ${postComment.commentUserId}`,
      );
      return await this.prisma.postComment.create({
        data: {
          comment: postComment.comment,
          postId: postComment.postId,
          commentUserId: postComment.commentUserId,
        },
      });
    } catch (error) {
      console.log('error: ', error);
      this.customLoggerService.successLog(
        `A user couldn't left a comment. Error: ${error}`,
      );
      return new HttpException(
        'Your post could not be shared due to a problem. Please try again later.',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  public getAllPosts(currentUserId: string): Promise<PostI[] | HttpException> {
    try {
      return this.prisma.post.findMany({
        orderBy: [
          {
            creationDate: 'desc',
          },
        ],
        include: {
          postImage: true,
          pool: {
            include: {
              userAnsweredPool: {
                where: {
                  userId: currentUserId,
                },
              },
            },
          },
          postComments: true,
          user: true,
        },
      });
    } catch (error) {
      throw new Error('There is a problem. Please try again later.');
    }
  }

  public getPostComments(postId: string): Promise<PostComment[]> {
    return this.prisma.postComment.findMany({
      where: { postId: postId },
      orderBy: {
        creationDate: 'desc',
      },
      include: {
        commentUser: true,
      },
    });
  }

  public async likeForPost(postId: string, userId: string): Promise<void> {
    const user: User = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      const post: PostI = await this.prisma.post.findUnique({
        where: { id: postId },
      });
      if (post.usersWhoLike.includes(userId)) {
        // if the user unlikes the post
        const index: number = post.usersWhoLike.indexOf(userId);
        post.usersWhoLike.splice(index, 1);
      } else {
        // if the user likes the post
        post.usersWhoLike.push(userId);
      }
      await this.prisma.post.update({
        where: { id: postId },
        data: { usersWhoLike: post.usersWhoLike },
      });
      this.customLoggerService.successLog(
        `A user liked the post.. UserId: ${userId}`,
      );
    }
  }

  public async likeForPostComment(
    postCommentId: string,
    userId: string,
  ): Promise<void> {
    const user: User = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      const postComment: PostComment = await this.prisma.postComment.findUnique(
        {
          where: { id: postCommentId },
        },
      );
      if (postComment.usersWhoLike.includes(userId)) {
        // if the user unlikes the post
        const index: number = postComment.usersWhoLike.indexOf(userId);
        postComment.usersWhoLike.splice(index, 1);
      } else {
        // if the user likes the post
        postComment.usersWhoLike.push(userId);
      }
      await this.prisma.post.update({
        where: { id: postCommentId },
        data: { usersWhoLike: postComment.usersWhoLike },
      });
    }
  }

  public async deletePost(postId: string, userId: string) {
    const post: PostI = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        postComments: true,
        postImage: true,
        pool: true,
      },
    });
    if (post && post.postComments) {
      await this.prisma.postComment.deleteMany({
        where: { postId: postId },
      });
    }
    if (post && post.postImage) {
      await this.prisma.postImage.deleteMany({
        where: { postId: postId },
      });
    }
    await this.prisma.post.delete({
      where: { id: postId },
    });
    this.customLoggerService.successLog(
      `A user deleted the post. UserId: ${userId}`,
    );
  }

  public async deleteComment(commentId: string): Promise<void> {
    await this.prisma.postComment.delete({
      where: { id: commentId },
    });
  }

  public async answerPool(
    poolId: string,
    answer: number,
    userId: string,
  ): Promise<Pool | HttpException> {
    try {
      if (answer > 2) {
        throw new HttpException(
          'There is a problem. Please try again later.',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.prisma.userAnsweredPool.create({
        data: {
          answer: Number(answer),
          poolId: poolId,
          userId: userId,
        },
      });
      const currentPool: Pool = await this.prisma.pool.findUnique({
        where: { id: poolId },
        include: {
          userAnsweredPool: true,
        },
      });
      const statistics: any = currentPool.statistics;
      statistics[answer] = statistics[answer] + 1;
      await this.prisma.pool.update({
        where: { id: poolId },
        data: {
          statistics: statistics,
        },
      });
      this.customLoggerService.successLog(
        `A user answered the survey.. UserId: ${userId}`,
      );
      return this.prisma.pool.findUnique({
        where: { id: poolId },
        include: {
          userAnsweredPool: true,
        },
      });
    } catch (error) {
      this.customLoggerService.successLog(
        `A user couldn't answered the survey.. Error: ${error}`,
      );
      throw new HttpException(
        'There is a problem. Please try again later.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
