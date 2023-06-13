import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { NotificationEntity } from 'src/entities/notification.entity';
import { AuthService } from 'src/auth/auth.service';
import { PostEntity } from 'src/entities/post.entity';
import { ReactionPostEntity } from 'src/entities/reaction.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { Logger } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      NotificationEntity,
      PostEntity,
      ReactionPostEntity,
      CommentEntity,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, AuthService],
})
export class PostModule {}
