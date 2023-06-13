import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/guard/roles.guard';
import { Cron } from '@nestjs/schedule';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post('create-new-post')
  async createNewPost(@Req() req, @Body() body: any) {
    return await this.postService.createNewPost(req.user_id, body);
  }

  @Get('get-posts')
  findAll() {
    return this.postService.getAllPost();
  }

  @Get('get-post/:post_id')
  findOne(@Param('post_id') post_id: number) {
    return this.postService.getPostById(post_id);
  }

  @UseGuards(AuthGuard)
  @Put('update-post/:post_id')
  async updatePost(
    @Param('post_id') post_id: number,
    @Req() req,
    @Body() body: any,
  ) {
    return await this.postService.updatePost(post_id, req.user_id, body);
  }
  @UseGuards(AuthGuard)
  @Delete('delete-post/:post_id')
  async removePost(
    @Param('post_id') post_id: number,
    @Req() req,
    @Body() body: any,
  ) {
    return await this.postService.removePost(post_id, req.user_id, body);
  }

  @UseGuards(AuthGuard)
  @Post('reaction-post/:post_id')
  async postReaction(
    @Param('post_id') post_id: number,
    @Req() req,
    @Body() body: any,
  ) {
    return await this.postService.postReaction(post_id, req.user_id, body);
  }

  @UseGuards(AuthGuard)
  @Post('comment-post/:post_id')
  async postComment(
    @Param('post_id') post_id: number,
    @Req() req,
    @Body() body: any,
  ) {
    return await this.postService.postComment(post_id, req.user_id, body);
  }

  // @Post('test-crontab')
  // async testCrontab() {
  //   return this.postService.runEvery5Seconds();
  // }
}
