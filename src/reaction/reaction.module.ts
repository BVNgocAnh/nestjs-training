import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { NotificationEntity } from 'src/entities/notification.entity';
import { PostEntity } from 'src/entities/post.entity';
import { ReactionPostEntity } from 'src/entities/reaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      NotificationEntity,
      PostEntity,
      ReactionPostEntity,
    ]),
  ],
  controllers: [ReactionController],
  providers: [ReactionService],
})
export class ReactionModule {}
