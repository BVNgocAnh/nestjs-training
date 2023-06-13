import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { ReactionPostEntity } from 'src/entities/reaction.entity';
import { ReactionArray } from 'src/enum/enum';
import { CommentEntity } from 'src/entities/comment.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,

    @InjectRepository(ReactionPostEntity)
    private reactionRepository: Repository<ReactionPostEntity>,

    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>, // private readonly logger = new Logger(PostService.name),
  ) {}

  // @Cron('*/5 * * * * *')
  // runEvery5Seconds() {
  //   console.log('Every 5 seconds');
  // }

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

  async createNewPost(user_id: number, body: any) {
    try {
      const user = await this.getUserByID(user_id);
      const new_post = await this.postRepository.create({
        content: body.content,
        reaction_quantity: body.reaction_quantity,
        created_by: user,
      });

      return this.postRepository.save(new_post);
    } catch (error) {}
  }

  async updatePost(post_id: number, user_id: number, body: any) {
    try {
      const update_post = await this.postRepository.update(
        { post_id: post_id },
        { content: body.content, reaction_quantity: body.reaction_quantity },
      );

      return update_post;
    } catch (e) {
      throw e;
    }
  }

  async getAllPost() {
    try {
      return await this.postRepository.find();
    } catch (e) {
      throw e;
    }
  }

  async getPostById(post_id: number) {
    try {
      const post = await this.postRepository.findOne({
        where: { post_id },
        relations: [
          'reacted_by_user',
          'reacted_by_user.user',
          'comment_by_user',
          'comment_by_user.user',
        ],
      });

      if (!post) {
        throw new NotFoundException(`Product with ID ${post_id} not found`);
      }

      return post;
    } catch (e) {
      throw e;
    }
  }

  async removePost(post_id: number, user_id: number, body: any) {
    try {
      const post = await this.postRepository.findOne({ where: { post_id } });

      if (!post) {
        throw new NotFoundException(`Post or User not found`);
      }
      const newPostStatus = post.post_status === 1 ? 0 : 1;

      await this.postRepository.update(
        { post_id },
        { post_status: newPostStatus },
      );

      return `Post with id: ${post_id} was deleted`;
    } catch (error) {}
  }

  async postReaction(post_id: number, user_id: number, body: any) {
    try {
      const post = await this.getPostById(post_id);

      const existing_reaction = await this.reactionRepository.findOne({
        where: { post: post_id, user: user_id },
      });

      if (!existing_reaction) {
        await this.reactionRepository
          .create({
            reaction_type: body.reaction_type,
            user: { user_id },
            post: { post_id },
          })
          .save();
        await this.postRepository.update(
          {
            post_id,
          },
          {
            [ReactionArray[body.reaction_type]]:
              post[ReactionArray[body.reaction_type]] + 1,
            reaction_quantity: post.reaction_quantity + 1,
          },
        );
      }

      if (existing_reaction.reaction_type == body.reaction_type) {
        await this.reactionRepository.delete({
          reaction_id: existing_reaction.reaction_id,
        });
        await this.postRepository.update(
          {
            post_id,
          },
          {
            [ReactionArray[body.reaction_type]]:
              post[ReactionArray[body.reaction_type]] - 1,
            reaction_quantity: post.reaction_quantity - 1,
          },
        );
        return;
      }

      if (existing_reaction.reaction_type != body.reaction_type) {
        await this.reactionRepository.update(
          { reaction_id: existing_reaction.reaction_id },
          { reaction_type: body.reaction_type },
        );
        await this.postRepository.update(
          {
            post_id,
          },
          {
            [ReactionArray[body.reaction_type]]:
              post[ReactionArray[body.reaction_type]] + 1,
            reaction_quantity: post.reaction_quantity + 1,
          },
        );
        return;
      }
    } catch (e) {
      throw e;
    }
  }

  async postComment(post_id: number, user_id: number, body: any) {
    try {
      const post = this.getPostById(post_id);

      if (!post) {
        throw new NotFoundException(`Post not found`);
      }
      await this.postRepository.update({ post_id }, { comment_quantity: +1 });
      const comment = this.commentRepository
        .create({
          comment_content: body.comment_content,
          user: { user_id },
          post: { post_id },
        })
        .save();

      return comment;
    } catch (e) {
      throw e;
    }
  }
}
