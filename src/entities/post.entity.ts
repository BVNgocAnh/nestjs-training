import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PostEnum, ReactionEnum } from 'src/enum/enum';
import { ReactionPostEntity } from './reaction.entity';
import { CommentEntity } from './comment.entity';
@Entity('post')
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column({ nullable: true })
  content: string;

  @Column({ name: 'like_react', nullable: true })
  like_react: number;

  @Column({ name: 'love_react', nullable: true })
  love_react: number;

  @Column({ name: 'haha_react', nullable: true })
  haha_react: number;

  @Column({ name: 'fun_react', nullable: true })
  fun_react: number;

  @Column({ name: 'sad_react', nullable: true })
  sad_react: number;

  @Column({ name: 'angry_react', nullable: true })
  angry_react: number;

  @Column({ nullable: true, default: 0 })
  reaction_quantity: number;

  @Column({ nullable: true, default: 0 })
  comment_quantity: number;

  @Column({ nullable: true, default: 1 })
  post_status: PostEnum;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'created_by' })
  created_by?: UserEntity;

  @OneToMany(() => ReactionPostEntity, (user) => user.post)
  @JoinColumn({ name: 'post_react' })
  reacted_by_user?: ReactionPostEntity;

  @OneToMany(() => CommentEntity, (user) => user.post)
  @JoinColumn({ name: 'postId_comment' })
  comment_by_user?: CommentEntity;
}
