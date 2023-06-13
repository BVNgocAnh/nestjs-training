import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { PostEntity } from 'src/entities/post.entity';
import { cp } from 'fs';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,

    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUserByID(user_id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async editComment(comment_id: number, user_id: number, body: any) {
    try {
      const comment = await this.commentRepository.findOne({
        where: { comment_id },
        relations: ['user', 'post'],
      });
      if (!comment)
        throw new NotFoundException(`Comment with ID ${comment_id} not found`);

      if (comment.user.user_id != user_id)
        throw new UnauthorizedException(`You can't edit this comment`);

      const edit_comment = await this.commentRepository.update(
        { comment_id },
        {
          comment_content: body.comment_content,
        },
      );
      return edit_comment;
    } catch (e) {
      throw e;
    }
  }

  async removeComment(user_id: number, comment_id: number) {
    try {
      const comment = await this.commentRepository.findOne({
        where: { comment_id },
        relations: ['user', 'post', 'post.created_by'],
      });
      const post_id = comment.post.post_id;
      const post = await this.postRepository.findOne({
        where: {
          post_id: comment.post.post_id,
        },
      });
      if (!comment)
        throw new NotFoundException(`Comment with ID ${comment_id} not found`);

      if (comment.post.created_by.user_id == user_id) {
        await this.commentRepository.delete(comment_id);
        await this.postRepository.update(
          { post_id },
          { comment_quantity: post.comment_quantity - 1 },
        );
        return;
      }

      if (comment.user.user_id != user_id) {
        throw new UnauthorizedException(`You can't delete this comment`);
      }
      await this.commentRepository.delete(comment_id);

      await this.postRepository.update(
        { post_id },
        { comment_quantity: post.comment_quantity - 1 },
      );
      return;
    } catch (e) {
      throw e;
    }
  }
}
