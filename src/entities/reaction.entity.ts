import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReactionEnum } from 'src/enum/enum';
import { UserEntity } from './user.entity';
import { PostEntity } from './post.entity';

@Entity('reaction')
export class ReactionPostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  reaction_id: number;

  @Column({ nullable: true, default: ReactionEnum.DEFAULT })
  reaction_type: ReactionEnum;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_react' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.post_id)
  @JoinColumn({ name: 'post_react' })
  post: PostEntity;
}
