import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PostEntity } from './post.entity';

@Entity('comment')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column({ nullable: true })
  comment_content: string;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.post_id)
  post: PostEntity;
}
